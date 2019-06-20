import Component from '@ember/component';
import { get, set } from '@ember/object';
import layout from '../../templates/components/uk-modal/open';

export default Component.extend({
  layout,
  tagName: 'button',
  classNames: ['uk-button', 'uk-button-default'],
  attributeBindings: ['targetModal:target', 'ukToggle:uk-toggle'],

  ukToggle: '',

  didInsertElement() {
    set(this, 'targetModal', `#${get(this, 'parent.modalName')}`);
  }
});
