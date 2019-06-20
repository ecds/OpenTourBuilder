import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('otb-crud/submit-buttons', 'Integration | Component | otb crud/submit buttons', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{otb-crud/submit-buttons}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#otb-crud/submit-buttons}}
      template block text
    {{/otb-crud/submit-buttons}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
