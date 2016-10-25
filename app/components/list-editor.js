/*
 * @desc Component to, ideally, allow contextually independent method for editing
 *       a list of items. It is currently configured to only work for a
 *       destinationItem of user (via sessionAccount.account service injection).
 */
import Ember from 'ember';
import DS from 'ember-data';

const { inject: { service }, isEmpty } = Ember;

export default Ember.Component.extend({
  store: service(),
  isRequesting: false, // true when the store is being queried
  selectPlaceholder: Ember.computed('itemModelAlias', function() {
    return 'Add a ' + this.get('itemModelAlias') + '...';
  }),
  searchPlaceholder: Ember.computed('itemModelAlias', function() {
    return 'Search for a ' + this.get('itemModelAlias') + '...';
  }),
  displayRemoveItemPrompt: false,
  removeItemPromptTitle: null,
  removeItemPromptContent: null,
  itemToAdd: null,
  itemToRemove: null,
  // lesser evil out of possible solutions for bubbling up when needed
  bubbleMeTriggers: false, 

  // TODO find a way to trigger action on parent during initialization of
  //      component without using this. It is deprecated behavior, as it's
  //      really inefficient, causing a re-render of the view during a render.
  didRender: function() {
    this.toggleProperty('bubbleMeTriggers');
  },

  // Get the source items filtered by searchTerm
  sourceItems: Ember.computed('destinationItems.length', 'sourceItemsPromiseObject.content', 'searchTerm', function() {
    var items = this.get('sourceItemsPromiseObject.content');
    var searchTerm = this.get('searchTerm');

    if (!isEmpty(items)) {
      return items.filter((item) => {
        console.log("Recomputed..");
        // only filter by search term if present
        var matchedTitle = true, matchedCid = true, cid;
        if (!isEmpty(searchTerm)) {
          // Check if matched
          matchedTitle = item.get('title').toLowerCase().indexOf(this.get('searchTerm').toLowerCase()) !== -1;
          if (this.get('isCourseList')) {
            cid = item.get('subject') + item.get('number');
            matchedCid = cid.toLowerCase().indexOf(this.get('searchTerm').toLowerCase()) !== -1;
          } else {
            matchedCid = true;
          }
        }
        // check if wasn't already added
        var alreadySelected = (this.get('destinationItems').indexOf(item) !== -1);
        // return result of individual
        return (matchedTitle || matchedCid) && !alreadySelected;
      });
    } else {
      return null;
    }
  }),
  sourceItemsPromiseObject: Ember.computed(function() {
    // This is necessary for nested promises in the computed property
    var _this = this;
    return DS.PromiseObject.create({
      promise: this.get('store').findRecord(this.get('sourceModel'), this.get('sourceId')).then((source) => {
        return source.get(_this.get('itemsModel'));
      })
    });
  }),
  filteredSourceItems: Ember.computed.alias('sourceItems'),


  // Get the destination items
  destinationItems: Ember.computed.alias('destinationItemsPromiseObject.content'),
  destinationItemsPromiseObject: Ember.computed(function() {
    // This is necessary for nested promises in the computed property
    var _this = this;
    return DS.PromiseObject.create({
      promise: this.get('store').findRecord(_this.get('destinationModel'), _this.get('destinationId')).then((destination) => {
        return destination.get(_this.get('itemsModel'));
      })
    });
  }),


  // Add , Adds item if selected
  itemAdded: Ember.observer('itemToAdd', function() {
    var item = this.get('itemToAdd');
    if (!isEmpty(item)) {
      this.addItemToDestination(item);
      this.set('itemToAdd', null);
    }
  }),
  addItemToDestination: function(item) {
    let destinationItems = this.get('destinationItems');
    destinationItems.addObject(item);
    item.save();
  },

  removeItemFromDestination: function(item) {
    let destinationItems = this.get('destinationItems');
    destinationItems.removeObject(item);
    item.save();
  },

  // Bubble up info about items on change
  rebubble: Ember.observer('bubbleMeTriggers', 'destinationItems.length', function() {
    this.bubbleOnChange();
  }),
  bubbleOnChange: function() {
    if (this.get('onChange')) {
      let numItems = this.get('destinationItems.length');
      this.get('onChange')({ numItems: numItems });
    }
  },

  actions: {
    // Save each object that was modified and bubble up if onSave is defined.
    // Can disable save button for component defined restrictions (e.g. list
    // cannot be empty).
    openRemoveItemPrompt: function(item) {
      // set remove prompt title
      let alias = this.get('itemModelAlias');
      this.set('removeItemPromptTitle', 'Are you sure you want to remove this ' + alias + '?');
      // set remove prompt content
      this.set('removeItemPromptContent', item.get('title'));
      this.set('itemToRemove', item);
      this.set('displayRemoveItemPrompt', true);
    },
    closeRemoveItemPrompt: function(response) {
      // remove if user confirmed
      if (response === "remove") {
        this.removeItemFromDestination(this.get('itemToRemove'));
      }
      // close prompt
      this.set('displayRemoveItemPrompt', false);
    },
    searchKeyPressed: function(e) {
      e.stopPropagation();
    }
  }
});
