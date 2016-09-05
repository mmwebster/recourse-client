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
  nodeIsRoot: Ember.computed.not('nodeIsntRoot'),
  shouldShowChildren: Ember.computed('node.selected', 'nodeIsRoot', 'nodeHasChildren', function() {
    // return true;
    // debugger;
    let x = this.get('nodeIsRoot');
    let y = this.get('nodeHasChildren');
    let z = this.get('node.selected');
    // logically... (x * y + ~x * y * z) = y * (x + ~x * z) = y * (x + z)
    return ( y && (x || z) );
  }),

  numChildrenRequiredFulfilled: false, //Ember.computed('node.selectedChildren.length'),

  selfSelectedObserver: Ember.observer('node.selected', function() {
    if (!Ember.isEmpty(this.get('onSelect'))) {
      this.get('onSelect')(this.get('node'));
    }
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
    // TODO: implement these two functions, such that clicking a check box
    //       informs that component to display its children (and vice-versa).
    //       And also informs its parent that it's been checked. This will cause
    //       the parent to adjust data sent down to its children that in turn
    //       makes check boxes enabled or not.
    selectSelf() {
    },
    childSelected(child) {
      if (!Ember.isEmpty(child)) {
        // init node's selected children if empty
        if (Ember.isEmpty(this.get('node.selectedChildren'))) {
          this.set('node.selectedChildren', []);
        }
        // append a new empty node to the children
        var childIndex = this.get('node.children').indexOf(child);
        this.get('node.selectedChildren').push(childIndex);
        if (!Ember.isEmpty(this.get('node.selectedChildren')) && this.get('node.numChildrenRequired') <= this.get('node.selectedChildren.length')) {
        // if (this.get('node.numChildrenRequired') <= this.get('node.children.length')) {
          this.set('numChildrenRequiredFulfilled', true);
        } else {
          this.set('numChildrenRequiredFulfilled', false);
        }
      }
    }
    // TODO: finish make shift two-way binding system so that checking a node
    //       opens up its children and indicates to parent that num required
    //       have or have not been fulfilled.
  }
});
