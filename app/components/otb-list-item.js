import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  classNames: ['tour-container'],
  classNameBindings: ['show', 'open', 'return', 'outUp:out-up', 'outDown:out-down', 'returnUp:return-up', 'returnDown:return-down'],

  show: computed('show', 'item', function()  {
    return true;
  }).property('item.show'),

  open: computed('open', 'item', function()  {
    return true;
  }).property('item.open'),

  return: computed('return', 'item', function()  {
    return get(this, 'item.return');
  }).property('item.return'),

  outUp: computed('outUp', 'item', function()  {
    return get(this, 'item.outUp');
  }).property('item.outUp'),

  outDown: computed('outDown', 'item', function()  {
    return get(this, 'item.outDown');
  }).property('item.outDown'),

  returnUp: computed('returnUp', 'item', function()  {
    return get(this, 'item.returnUp');
  }).property('item.returnUp'),

  returnDown: computed('returnDown', 'item', function()  {
    return get(this, 'item.returnDown');
  }).property('item.returnDown')
});
