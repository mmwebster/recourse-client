import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('decision-tree-window', 'Integration | Component | decision tree window', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{decision-tree-window}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#decision-tree-window}}
      template block text
    {{/decision-tree-window}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
