import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | otb-crud/crud-actions', function() {
  setupComponentTest('otb-crud/crud-actions', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#otb-crud/crud-actions}}
    //     template content
    //   {{/otb-crud/crud-actions}}
    // `);

    this.render(hbs`{{otb-crud/crud-actions}}`);
    expect(this.$()).to.have.length(1);
  });
});
