import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tour-list-mobile', 'Integration | Component | tour list mobile', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tour-list-mobile}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tour-list-mobile}}
      template block text
    {{/tour-list-mobile}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
