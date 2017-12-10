import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('otb-list-item-body', 'Integration | Component | otb list item body', {
    integration: true
});

test('it renders', function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(hbs`{{otb-list-item-body}}`);

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(hbs`
    {{#otb-list-item-body}}
      template block text
    {{/otb-list-item-body}}
  `);

    assert.equal(this.$().text().trim(), 'template block text');
});
