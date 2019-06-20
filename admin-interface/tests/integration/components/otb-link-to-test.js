import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('otb-link-to', 'Integration | Component | otb link to', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{otb-link-to}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#otb-link-to}}
      template block text
    {{/otb-link-to}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
