import Service from '@ember/service';

export default class ReaderService extends Service {
  utterance = this.utterance || null;
  synth = this.synth || null;
  text = this.text || null;
  speaking = this.speaking || false;

  read(content) {
    const _utterance = this.utterance;
    _utterance.text = content;
    _utterance.lang = navigator.language;
    this.synth.speak(_utterance);
  }

  resume() {
    this.synth.resume();
  }

  pause() {
    this.synth.pause();
  }

  cancel() {
    this.synth.cancel();
  }
}
