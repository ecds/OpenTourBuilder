import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | desktop-tour-list', function() {
  setupComponentTest('desktop-tour-list', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#desktop-tour-list}}
    //     template content
    //   {{/desktop-tour-list}}
    // `);

    this.render(hbs`{{desktop-tour-list}}`);
    expect(this.$()).to.have.length(1);
  });
});
