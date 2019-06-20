import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('otb-crud/stop', 'Integration | Component | otb-crud/stop', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{otb-crud/stop}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#otb-crud/stop}}
      template block text
    {{/otb-crud/stop}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
