import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('select-travel-mode', 'Integration | Component | select travel mode', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{select-travel-mode}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#select-travel-mode}}
      template block text
    {{/select-travel-mode}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
