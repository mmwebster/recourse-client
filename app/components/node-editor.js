// @note This component does not save any properties, that is handled by the
//       non-recursive tree-editor.

import Ember from 'ember';

export default Ember.Component.extend({
  // Node properties:
  //  title, type, children, num_children_required, children_selected,
  //  num_descendents, is_duplicate, parent_rel, course_id

  nodeHasChildren: Ember.computed('node.children.length', function() {
    return (this.get('node.children.length') > 0);
  }),
  recurrenceDepth: Ember.computed('parentRecurrenceDepth', function() {
    return this.get('parentRecurrenceDepth') + 1;
  }),
  nodeIsPivot: Ember.computed('node.type', function() {
    return (this.get('node.type') === 'pivot');
  }),
  nodeIsntRoot: Ember.computed('recurrenceDepth', function() {
    return (this.get('recurrenceDepth') > 1);
  }),

  actions: {
    // @desc Create a child node of type 'pivot' or 'course'
    createChild(type) {
      switch(type) {
        case 'pivot':
          break;
        case 'course':
          break;
      }
    },
  }
});
