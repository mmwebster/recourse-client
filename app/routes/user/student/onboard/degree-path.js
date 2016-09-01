import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  sessionAccount: service('session-account'),

  model: function() {
    var _this = this;
    var user = this.get('sessionAccount.account');
    return this.get('sessionAccount.account.timelines').then(function(timelines) {
      // check if user's timelines are empty
      // create empty timeline if no timelines
      if (timelines.get('length') < 1) {
        console.log("Creating new timeline.");
        var newTimeline = _this.store.createRecord('timeline', {
          title: 'My First Timeline',
          isCurrent: true,
        });
        // add it to the user's timelines
        user.get('timelines').pushObject(newTimeline);
        // return it after saving
        return newTimeline.save().then(function(newSavedTimeline) {
          return newSavedTimeline;
        });
      } else {
        console.log("Loading existing timeline.");
        return timelines.findBy('isCurrent', true);
      }
    });
  }
});
