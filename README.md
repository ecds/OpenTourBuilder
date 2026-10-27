# OpenTour Builder

OpenTour Builder is an open-source platform for building geospatial tours that work well on phones. Tour creators add stops with locations, images, video, and text. Visitors follow the tour on a map, with directions from stop to stop.

It's built and maintained by the [Emory Center for Digital Scholarship](https://digitalscholarship.emory.edu/) (ECDS).

- **Documentation:** [docs.opentour.site](https://docs.opentour.site)
- **ECDS's hosted service:** [opentour.site](https://opentour.site). To apply for a tour site, see the [proposal process](https://digitalscholarship.emory.edu/opentour-builder-proposal-process/).

## Code

OpenTour is made of three applications, each in its own repository:

| Repository | What it is | Built with |
|---|---|---|
| [otb-api-server](https://github.com/ecds/otb-api-server) | The API that stores tours and serves both front ends. Each tour site gets its own database schema. | Ruby on Rails, PostgreSQL |
| [otb-admin-interface](https://github.com/ecds/otb-admin-interface) | Where tour creators build and publish tours. | React Router, TypeScript |
| [otb-public-interface](https://github.com/ecds/otb-public-interface) | The tours visitors see, at `<tour-site>.opentour.site`. | React Router, TypeScript |

See each repository's README for setup and development instructions.

## Documentation

The documentation lives in [`docs/`](docs/) as plain Markdown and is published to [docs.opentour.site](https://docs.opentour.site) whenever it changes on the `develop` branch.

To change it, edit the Markdown files, directly on GitHub or locally, and commit. New pages need a line in the `nav:` list in [`mkdocs.yml`](mkdocs.yml) to appear in the menu. Stick to Markdown that GitHub itself displays correctly, so the files stay readable here too.

To preview the site locally (optional):

```bash
pip install -r requirements.txt
mkdocs serve
```

## License

OpenTour Builder is released under the [MIT License](MIT-LICENSE). Please follow our [Code of Conduct](CODE_OF_CONDUCT.md).
