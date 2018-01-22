import DS from 'ember-data';
import AdminModelMixin from 'ember-admin/mixins/admin-model-mixin'

const { Model, attr } = DS;

export default Model.extend(AdminModelMixin, {
  title: attr('string'),
  slug: attr('string'),
  lat: attr('number'),
  lng: attr('number'),
  description: attr('string'),
  sanitized_description: attr('string'),
  metadescription: attr('string'),
  article_link: attr('string'),
  video_embed: attr('string'),
  video_poster: attr('string'),
  direction_intro: attr('string'),
  direction_notes: attr('string')
});
