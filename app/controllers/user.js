import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service('session'),
  sessionAccount: service('session-account'),
  // Return path parts names after /user for bread crumbs
  applicationController: Ember.inject.controller("application"),
  path: Ember.computed('applicationController.currentPath', function() {
    var path = this.get('applicationController.currentPath').split('.');
    // remove the first element `user`
    path.shift();
    // remove `index` if it exists
    var index = path.indexOf("index");
    if (index !== -1) {
      path.splice(index, 1);
    }
    return path;
  }),

  routeIsSettings: Ember.computed('path', function() {
    return (this.get('path')[0] === "settings");
  }),
  routeIsDashboard: Ember.computed('path', function() {
    return (this.get('path')[0] === "dashboard");
  }),
});
