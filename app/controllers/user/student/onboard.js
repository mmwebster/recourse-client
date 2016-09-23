import Ember from 'ember';

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller("application"),

  onboardPath: Ember.computed('applicationController.currentPath', function() {
    // get the onboard sub-route name
    return this.get('applicationController.currentPath').split('.')[3];
  }),

  onboardProgressValue: Ember.computed('onboardPath', function() {
    switch(this.get('onboardPath')) {
      case 'school':
        return 27;
      case 'degree-path':
        return 50;
      case 'prior-coursework':
        return 73;
      default:
        console.log("ERROR: Invalid onboard path `/user/student/onboard.js`");
    }
  }),
  routeIsSchool: Ember.computed('onboardPath', function() {
    return this.get('onboardPath') === "school";
  }),
  routeIsDegreePath: Ember.computed('onboardPath', function() {
    return this.get('onboardPath') === "degree-path";
  }),
  routeIsPriorCoursework: Ember.computed('onboardPath', function() {
    return this.get('onboardPath') === "prior-coursework";
  }),
  routeIsntSchool: Ember.computed.not('routeIsSchool'),
  routeIsntDegreePath: Ember.computed.not('routeIsDegreePath'),
  routeIsntPriorCoursework: Ember.computed.not('routeIsPriorCoursework'),

  actions: {
    transition: function(routeName) {
      this.transitionToRoute(routeName);
    }
  },
});
