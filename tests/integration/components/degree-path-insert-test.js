import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('degree-path-insert', 'Integration | Component | degree path insert', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{degree-path-insert}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#degree-path-insert}}
      template block text
    {{/degree-path-insert}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
