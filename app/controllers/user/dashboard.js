import Ember from 'ember';

const { inject: { service }, isEmpty } = Ember;

export default Ember.Controller.extend({
  sessionAccount: service('session-account'),

  // rename properties for readability sake
  timelines: Ember.computed.alias('model'),
  user: Ember.computed.alias('sessionAccount.account'),

  currentTimeline: Ember.computed('model', function() {
    var timelines = this.get('model');
    if (isEmpty(timelines)) {
      var user = this.get('user');
      var timeline = this.store.createRecord('timeline', {
        title: 'My First Timeline',
        isCurrent: true,
      });
      user.pushRecord(timeline);
      return timeline.save().then(function(timeline) {
        return timeline;
      });
    } else {
      // Return the first timeline that matches isCurrent=true
      return timelines.findBy('isCurrent', true);
    }
  }),

  // currentYears: Ember.computed('currentTimeline.quarters', function() {
  //   var quarters = this.get('currentTimeline.quarters');
  //   var years = [];
  //   var quarterIndex = 0;
  //   debugger;
  //   while (quarterIndex <= quarters.get('length')) {
  //     years.push(quarters.slice(quarterIndex, 3));
  //     quarterIndex += 3;
  //   }
  //   return years;
  // }),

  actions: {
    sayHi: function(hi) {
      console.log(hi);
      debugger;
    }
  },
});
