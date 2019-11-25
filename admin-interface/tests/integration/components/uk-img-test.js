import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | uk-img', function() {
  setupComponentTest('uk-img', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#uk-img}}
    //     template content
    //   {{/uk-img}}
    // `);

    this.render(hbs`{{uk-img}}`);
    expect(this.$()).to.have.length(1);
  });
});
