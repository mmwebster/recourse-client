import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('degree-path-list', 'Integration | Component | degree path list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{degree-path-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#degree-path-list}}
      template block text
    {{/degree-path-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
