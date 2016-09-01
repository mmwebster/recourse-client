import Ember from 'ember';

const { isEmpty } = Ember;

export default Ember.Component.extend({
  filteredItems: Ember.computed('items', 'titleFilter', function() {
    var items = this.get('items');
    var titleFilter = this.get('titleFilter');
    if (!isEmpty(items)) {
      if (!isEmpty(titleFilter)) {

        // Filter search results based on current titleFilter
        return items.filter((item) => {
          return item.get('title').toLowerCase().indexOf(this.get('titleFilter')) !== -1;
        });

      } else {
        return items;
      }
    } else {
      return null;
    }
  }),
});
