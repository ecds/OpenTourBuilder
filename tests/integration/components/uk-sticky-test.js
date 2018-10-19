import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | uk-sticky', function() {
  setupComponentTest('uk-sticky', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#uk-sticky}}
    //     template content
    //   {{/uk-sticky}}
    // `);

    this.render(hbs`{{uk-sticky}}`);
    expect(this.$()).to.have.length(1);
  });
});
