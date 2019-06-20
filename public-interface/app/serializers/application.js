import DS from 'ember-data';
import { underscore } from '@ember/string';

const { JSONAPISerializer } = DS;

export default class ApplicationSerializer extends JSONAPISerializer {
  keyForAttribute(attr) {
    return underscore(attr);
  }

  keyForRelationship(rawKey) {
    return underscore(rawKey);
  }
}
