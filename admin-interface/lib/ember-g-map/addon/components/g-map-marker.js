import GMapBase from 'ember-g-map/components/g-map-base';
import { get, set } from '@ember/object';
// import {` assert } from '@ember/debug';
import { isPresent, typeOf } from '@ember/utils';
import { ParentMixin, ChildMixin } from 'ember-composability-tools';
import { inject as service } from '@ember/service';
import layout from '../templates/components/g-map-overlayable';
/* global google */

export default GMapBase.extend(ParentMixin, ChildMixin, {
  layout,
  tagName: '',
  geoLocation: service(),
  createFeature() {
    if (this.get('isFastBoot')) {
      return;
    }

    return new google.maps.Marker();
  },

  didInsertParent() {
    // Check for fastBoot
    if (this.get('isFastBoot')) {
      return;
    }

    set(this, 'feature', this.createFeature());
    this.addToContainer();
  },

  didcreateFeature() {
    //
  },

  didReceiveAttrs() {
    this.setPosition();
    this.addToContainer();
  },

  addToContainer() {
    if (this.get('isFastBoot')) {
      return;
    }

    this.didcreateFeature();
    if (isPresent(this.feature)) {
      this.setPosition();
      // this.setZIndex();
      this.setIcon();
      this.setDraggable();
      this.setLabel();
      this.setTitle();
      this.setAnimation();
      this.setOnClick();
      this.setOnDrag();

      let map = get(this, 'parentComponent').feature;
      set(this, 'map', map);
      get(this, 'feature').setMap(map);
    }
  },

  willDestroy() {
    if (this.get('isFastBoot')) {
      return;
    }

    google.maps.event.clearInstanceListeners(get(this, 'feature'));
  },

  setPosition() {
    if (this.get('isFastBoot')) {
      return;
    }

    const marker = this.feature;
    const latLng = get(this, 'position');
    const lat = parseFloat(get(this, 'lat'));
    const lng = parseFloat(get(this, 'lng'));

    const markerPosition = isPresent(latLng)
      ? latLng
      : new google.maps.LatLng(parseFloat(lat), parseFloat(lng));

    if (isPresent(marker) && isPresent(markerPosition)) {
      const map = get(this, 'parentComponent.feature');
      marker.setPosition(markerPosition);
      let bounds = get(this, 'parentComponent.bounds');
      if (bounds) {
        bounds.extend(this.feature.getPosition());
        map.fitBounds(bounds);
      }
    }
  },

  setIcon() {
    if (this.get('isFastBoot')) {
      return;
    }

    const icon = this.get('icon');

    if (isPresent(icon)) {
      this.feature.setIcon(icon);
    }
  },

  // setZIndex() {
  //   const marker = this.get('marker');
  //   const zIndex = this.get('zIndex');
  //   if (isPresent(marker) && isPresent(zIndex)) {
  //     marker.setZIndex(zIndex);
  //   }
  // },

  setDraggable() {
    const draggable = this.get('draggable');
    if (isPresent(this.feature) && isPresent(draggable)) {
      this.feature.setDraggable(draggable);
    }
  },

  setOnClick() {
    const marker = this.get('feature');
    if (isPresent(marker)) {
      marker.addListener('click', () => this.sendOnClick());
    }
  },

  setOnDrag() {
    this.feature.addListener('dragend', event => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      if (isPresent(lat) && isPresent(lng) && isPresent(this.feature)) {
        const position = new google.maps.LatLng(lat, lng);
        this.feature.setPosition(position);
        this.sendOnDrag(lat, lng);
      }
    });
  },

  setLabel() {
    const label = this.get('label');

    if (isPresent(label)) {
      this.feature.setLabel(label);
    }
  },

  setTitle() {
    const title = this.get('title');

    if (isPresent(title)) {
      this.feature.setTitle(title);
    }
  },

  setAnimation() {
    const animation = this.get('animation');
    if (isPresent(animation)) {
      if (animation.toUpperCase() == 'DROP') {
        this.feature.setAnimation(google.maps.Animation.DROP);
      } else if (animation.toUpperCase() == 'BOUNCE') {
        this.feature.setAnimation(google.maps.Animation.BOUNCE);
      } else {
        // Assert something
      }
    }
  },

  sendOnClick() {
    const onClick = this.get('onClick');
    const mapContext = this.get('mapContext');
    const group = this.get('group');

    if (typeOf(onClick) === 'function') {
      onClick();
    } else {
      this.sendAction('onClick');
    }

    if (isPresent(group)) {
      mapContext.groupMarkerClicked(this, group);
    }
  },

  sendOnDrag(lat, lng) {
    const onDrag = get(this, 'onDrag');

    if (typeOf(onDrag) === 'function') {
      onDrag(lat, lng);
    } else {
      this.sendAction('onDrag', lat, lng);
    }
  }
});
