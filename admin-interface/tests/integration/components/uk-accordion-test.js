import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | uk-accordion', function() {
  setupComponentTest('uk-accordion', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#uk-accordion}}
    //     template content
    //   {{/uk-accordion}}
    // `);

    this.render(hbs`{{uk-accordion}}`);
    expect(this.$()).to.have.length(1);
  });
});
