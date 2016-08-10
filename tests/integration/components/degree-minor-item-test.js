import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('degree-minor-item', 'Integration | Component | degree minor item', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{degree-minor-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#degree-minor-item}}
      template block text
    {{/degree-minor-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
