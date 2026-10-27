"""Turns PNG and JPEG images under docs/ into WebP, no wider than MAX_WIDTH,
and points the Markdown at the new files. Prints the paths it changed, one
per line, so the workflow knows whether there's anything to commit.

Usage: python optimize_images.py [docs_dir]
"""

import re
import sys
from pathlib import Path
from urllib.parse import quote, unquote

from PIL import Image, ImageOps

MAX_WIDTH = 1600
QUALITY = 85
SOURCE_SUFFIXES = {".png", ".jpg", ".jpeg"}

# Image paths in Markdown links, ![alt](path "title") or ![alt](<path>),
# and in HTML, src="path". Links to other sites are left alone.
LINK = re.compile(
    r'(?P<prefix>\]\(\s*<)(?P<bracketed>[^>]+)'
    r'|(?P<prefix2>\]\(\s*)(?P<plain>[^)\s<]+)'
    r'|(?P<prefix3>src=["\'])(?P<src>[^"\']+)'
)


def convert(source: Path) -> Path:
    target = source.with_suffix(".webp")
    n = 1
    while target.exists():
        target = source.with_name(f"{source.stem}-{n}.webp")
        n += 1

    with Image.open(source) as image:
        # Phone photos store their rotation separately; apply it before saving.
        image = ImageOps.exif_transpose(image)
        if image.width > MAX_WIDTH:
            height = round(image.height * MAX_WIDTH / image.width)
            image = image.resize((MAX_WIDTH, height), Image.LANCZOS)
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA" if "transparency" in image.info else "RGB")
        image.save(target, "WEBP", quality=QUALITY, method=6)

    source.unlink()
    return target


def relink(markdown: Path, renamed: dict[Path, Path]) -> bool:
    text = markdown.read_text(encoding="utf-8")

    def replace(match: re.Match) -> str:
        prefix = match["prefix"] or match["prefix2"] or match["prefix3"]
        link = match["bracketed"] or match["plain"] or match["src"]
        if "://" in link or link.startswith(("/", "#", "data:")):
            return match.group(0)

        path, sep, rest = link.partition("?")
        if not sep:
            path, sep, rest = link.partition("#")
        resolved = (markdown.parent / unquote(path)).resolve()
        if resolved not in renamed:
            return match.group(0)

        folder = path.rpartition("/")[0]
        new_name = renamed[resolved].name
        if match["bracketed"] is None:
            new_name = quote(new_name)
        new_path = f"{folder}/{new_name}" if folder else new_name
        return prefix + new_path + sep + rest

    updated = LINK.sub(replace, text)
    if updated == text:
        return False
    markdown.write_text(updated, encoding="utf-8")
    return True


def main() -> None:
    docs = Path(sys.argv[1] if len(sys.argv) > 1 else "docs").resolve()
    sources = [
        path
        for path in docs.rglob("*")
        if path.is_file() and path.suffix.lower() in SOURCE_SUFFIXES
    ]

    renamed = {source.resolve(): convert(source).resolve() for source in sources}
    for old, new in renamed.items():
        print(old.relative_to(docs.parent))
        print(new.relative_to(docs.parent))

    if renamed:
        for markdown in docs.rglob("*.md"):
            if relink(markdown, renamed):
                print(markdown.relative_to(docs.parent))


if __name__ == "__main__":
    main()
