import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | uk-accordion/content', function() {
  setupComponentTest('uk-accordion/content', {
    integration: true
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#uk-accordion/content}}
    //     template content
    //   {{/uk-accordion/content}}
    // `);

    this.render(hbs`{{uk-accordion/content}}`);
    expect(this.$()).to.have.length(1);
  });
});
