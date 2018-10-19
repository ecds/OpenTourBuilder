import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | uk-table-striped', function() {
  setupComponentTest('uk-table-striped', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#uk-table-striped}}
    //     template content
    //   {{/uk-table-striped}}
    // `);

    this.render(hbs`{{uk-table-striped}}`);
    expect(this.$()).to.have.length(1);
  });
});
