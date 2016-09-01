import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  sessionAccount: service(),

  // must load in the timeline prior to use in any of the template, as the
  // list-editor component is not yet set up to handle promises
  model: function() {
    var _this = this;
    var user = this.get('sessionAccount.account');
    return user.get('timelines').then(function(timelines) {
      if (timelines.get('length') < 1) {
        // create new timeline
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
        return timelines.findBy('isCurrent', true);
      }
    });
  }
});
