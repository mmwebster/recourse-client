import Ember from 'ember';

export default Ember.Component.extend({
  nodeHasChildren: Ember.computed('node.children.length', function() {
    return (this.get('node.children.length') > 0);
  }),
  recurrenceDepth: Ember.computed('parentRecurrenceDepth', function() {
    return this.get('parentRecurrenceDepth') + 1;
  }),
});
