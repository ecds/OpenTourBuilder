import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | login-form', function() {
  setupComponentTest('login-form', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#login-form}}
    //     template content
    //   {{/login-form}}
    // `);

    this.render(hbs`{{login-form}}`);
    expect(this.$()).to.have.length(1);
  });
});
