import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('otb-crud/tour', 'Integration | Component | otb crud/tour', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{otb-crud/tour}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#otb-crud/tour}}
      template block text
    {{/otb-crud/tour}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
