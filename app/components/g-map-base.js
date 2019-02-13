import { reads } from '@ember/object/computed';
import Component from '@ember/component';
import { assert } from '@ember/debug';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { ChildMixin } from 'ember-composability-tools';
import layout from '../templates/components/g-map-base';

export default Component.extend(ChildMixin, {
  layout,
  tagName: '',
  fastboot: service(),
  isFastBoot: reads('fastboot.isFastBoot'),
  map: null,
  feature: null,

  createFeature() {
    assert("GMapBase's `createFeature` should be overriden.");
  },
  /*
   * Method called by parent when the layer needs to setup
   */
  didInsertParent() {
    // Check for fastBoot
    if (this.get('isFastBoot')) {
      return;
    }

    set(this, 'feature', this.createFeature());
    // this._addObservers();
    // this._addEventListeners();
    if (this.get('parentComponent')) {
      this.addToContainer();
    }
    this.didcreateFeature();
  },

  willDestroyParent() {
    if (this.get('isFastBoot')) {
      return;
    }
  },

  willDestroy() {
    if (this.get('isFastBoot')) {
      return;
    }

    get(this, 'feature').setMap(null);
  },

  addToContainer() {
    // console.log('generic addToCont')
    // this.feature.setMap(this.get('parentComponent')._feature);
  },

  didcreateFeature() {
    //
  }
});
