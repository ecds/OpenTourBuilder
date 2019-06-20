import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | otb-crud/common-form', function() {
  setupComponentTest('otb-crud/common-form', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#otb-crud/common-form}}
    //     template content
    //   {{/otb-crud/common-form}}
    // `);

    this.render(hbs`{{otb-crud/common-form}}`);
    expect(this.$()).to.have.length(1);
  });
});
