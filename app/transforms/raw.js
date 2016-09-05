// @desc A serializer used for working with raw JSON
import DS from 'ember-data';
import Ember from 'ember';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    try {
      return JSON.parse(serialized)
    }
    catch (e) {
      return serialized;
    }
  },
  serialize: function(deserialized) {
    let root = deserialized;
    try {
      this.recurAndSerialize(root);
    }
    catch (e) {
      // TODO:
      // For now, spitting out fatal error to prevent persisting to the db.
      // Need to figure out how to stop persistence from this serializer upon
      // receiving the exception from the recursive parser function. Can
      // actually just make an ember-paper validation but that requires space
      // below the input that I don't want to use right now (just to show more
      // rows at a time).
      alert("Parsing error: " + e + ". Check for trailing commas in lists. You will have to reload the page.");
      throw 'ERROR: Could not parse node field';
    }
    return root;
  },

  ArrayFields: ['childrenSelected'],

  recurAndSerialize(node) {
    if (!Ember.isEmpty(node)) {
      // parse all array fields
      this.get('ArrayFields').forEach((field) => {
        if (!Ember.isEmpty(node[field])) {
          Ember.set(node, field, JSON.parse("[" + node[field] + "]"));
        }
      });
      // recur on all children
      if (!Ember.isEmpty(node.children)) {
        node.children.forEach((child) => {
          this.recurAndSerialize(child);
        });
      }
    }
  },
});
