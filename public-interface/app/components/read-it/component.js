import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ReadItComponent extends Component {
  @service fastboot;

  @tracked speaking;
  @tracked supported;
  @tracked speechEnded;
  @tracked synth;
  @tracked utterance;

  read() {
    this.utterance.text = this.args.content;
    this.utterance.lang = navigator.language;
    this.synth.speak(this.utterance);
  }

  @action
  registerUtterance() {
    if (this.fastboot.isFastBoot) return;
    if ('speechSynthesis' in window) {
      this.supported = true;
      this.utterance = new SpeechSynthesisUtterance(this.args.content);
      this.utterance.onend = () => {
        this.speaking = false;
      };

      this.synth = window.speechSynthesis;
    }
  }

  @action
  destroyUtterance() {
    if (this.fastboot.isFastBoot) return;
    if (this.synth !== null) {
      this.synth.resume();
      this.synth.cancel();
    }
  }

  @action
  sayIt() {
    if (this.fastboot.isFastBoot) return;
    this.speaking = true;
    if (this.synth.paused) {
      this.synth.resume();
    } else {
      this.read(this.args.content);
    }
  }

  @action
  pause() {
    this.speaking = false;
    this.synth.pause();
  }
}
