import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('decision-node-editor', 'Integration | Component | decision node editor', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{decision-node-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#decision-node-editor}}
      template block text
    {{/decision-node-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
