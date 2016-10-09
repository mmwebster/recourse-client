import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('quarter-editing-window', 'Integration | Component | quarter editing window', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{quarter-editing-window}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#quarter-editing-window}}
      template block text
    {{/quarter-editing-window}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
