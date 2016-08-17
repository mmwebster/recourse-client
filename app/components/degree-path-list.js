import Ember from 'ember';

export default Ember.Component.extend({
  displayRemoveItemPrompt: false,
  removePromptTitle: null,
  removePromptContent: null,

  itemToDelete: null,

  actions: {
    removeItemPrompt: function(item) {
      // set remove prompt title
      if (this.get('type') === 'major') {
        this.set('removePromptTitle', "Are you sure you want to remove this major?");
      } else {
        this.set('removePromptTitle', "Are you sure you want to remove this minor?");
      }
      // set remove prompt content
      this.set('removePromptContent', item.title);
      this.set('itemToDelete', item);
      this.set('displayRemoveItemPrompt', true);
    },
    closeRemoveItemPrompt: function(response) {
      // bubble up remove action if user confirms
      if (response === "remove") {
        this.get('onDelete')(this.get('itemToDelete'));
      }
      // close prompt
      this.set('displayRemoveItemPrompt', false);
    },
  },
});
