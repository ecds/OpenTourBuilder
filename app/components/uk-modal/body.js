import Component from '@ember/component';
import layout from '../../templates/components/uk-modal/body';

export default Component.extend({
  layout,
  classNames: ['uk-modal-body'],
  attributeBindings: ['parent.overflowAuto:uk-overflow-auto']
});
