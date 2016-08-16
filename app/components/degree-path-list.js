import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    removeItem: function(item) {
      alert("Removing item " + item.title);
    }
  },
});
