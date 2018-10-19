import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | otb-embed', function() {
  setupComponentTest('otb-embed', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#otb-embed}}
    //     template content
    //   {{/otb-embed}}
    // `);

    this.render(hbs`{{otb-embed}}`);
    expect(this.$()).to.have.length(1);
  });
});
