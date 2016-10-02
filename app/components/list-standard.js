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
          // Check if matched
          var matchedTitle = item.get('title').toLowerCase().indexOf(this.get('titleFilter').toLowerCase()) !== -1;
          var cid = item.get('subject') + item.get('number');
          var matchedCid = cid.toLowerCase().indexOf(this.get('titleFilter').toLowerCase()) !== -1;
          // return result of individual
          return matchedTitle || matchedCid;
        });

      } else {
        return items;
      }
    } else {
      return null;
    }
  }),
});
