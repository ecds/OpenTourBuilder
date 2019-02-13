// app/serializers/application.js
import { underscore } from '@ember/string';

import DS from 'ember-data';

const { JSONAPISerializer } = DS;

export default JSONAPISerializer.extend({
  keyForAttribute: function removeDashes(attr) {
    return underscore(attr);
  },

  keyForRelationship: function removeDashes(rawKey) {
    return underscore(rawKey);
  }
});
