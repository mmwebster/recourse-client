import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service('session'),
  sessionAccount: service('session-account'),
  // Return the name of the bottom-levelroute to use in toolbar cookie trail in /user
  actionPathName: null,
  pathName: Ember.computed('model.transitionPathName', 'actionPathName', function() {
    if (this.get('actionPathName') === null) {
      return this.get('model.transitionPathName');
    } else {
      return this.get('actionPathName');
    }
  }),
  routeIsDashboard: Ember.computed('pathName', function() {
    return this.get('pathName') === "dashboard";
  }),
  routeIsSettings: Ember.computed('pathName', function() {
    return this.get('pathName') === "settings";
  }),

  items: [
    {
      icon: "person",
      title: "A person"
    }
  ],

  actions: {
    changePathToDashboard: function() {
      this.set('actionPathName', 'dashboard');
    },
    changePathToSettings: function() {
      this.set('actionPathName', 'settings');
    },
  }
});
