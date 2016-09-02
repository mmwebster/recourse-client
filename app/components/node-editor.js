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
  nodeIsCourse: Ember.computed('node.type', function() {
    return (this.get('node.type') === 'course');
  }),
  nodeIsntRoot: Ember.computed('recurrenceDepth', function() {
    return (this.get('recurrenceDepth') > 1);
  }),

  actions: {
    // @desc Create a child node of type 'pivot' or 'course'
    createChild(type) {
      // init node's children if empty
      if (Ember.isEmpty(this.get('node.children'))) {
        this.set('node.children', []);
      }
      // append a new empty node to the children
      this.get('node.children').push({type: type, children: []});
    },
    deleteSelf() {
      // hide self, acting as deleted
      this.set('node.hidden', true);
      // trigger action on parent to actual remove the node
      this.get('onDelete')(this.get('node'));
    },
    deleteChild(child) {
      var node = this.get('node');
      var childIndex = node.children.indexOf(child);
      node.children.splice(childIndex, 1);
    },
  }
});
