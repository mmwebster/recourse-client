import Ember from 'ember';

const { isEmpty } = Ember;

export default Ember.Component.extend({
  placeholderText: Ember.computed('type', function() {
    return "Add a " + this.get('type');
  }),

  itemAdded: Ember.observer('itemToAdd', function() {
    var item = this.get('itemToAdd');
    if (!isEmpty(item)) {
      this.get('onInsert')(item);
      this.set('itemToAdd', null);
    }
  }),
});
