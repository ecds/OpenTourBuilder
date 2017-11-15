import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
    tagName: '',
    markers() {
        return get(this, 'stops')
    }
});
