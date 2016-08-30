import Ember from 'ember';

const { inject: { service }, isEmpty } = Ember;

export default Ember.Controller.extend({
  sessionAccount: service('session-account'),

  // rename properties for readability sake
  timelines: Ember.computed.alias('model'),
  user: Ember.computed.alias('sessionAccount.account'),
  syncDisabled: Ember.computed.not('currentTimeline.sync'),

  currentTimeline: Ember.computed('model', function() {
    var timelines = this.get('model');
    if (isEmpty(timelines)) {
      var user = this.get('user');
      var timeline = this.store.createRecord('timeline', {
        title: 'My First Timeline',
        isCurrent: true,
      });
      user.get('timelines').pushObject(timeline);
      return timeline.save().then((timeline) => {
        return timeline;
      });
    } else {
      // Return the first timeline that matches isCurrent=true
      return timelines.findBy('isCurrent', true);
    }
  }),

  // breaks currentTimeline of quarters into years
  currentYears: Ember.computed('currentTimeline.quarters', function() {
    var years = [{ quarters: [] }];
    var yearIndex = 0;
    this.get('currentTimeline.quarters').forEach((quarter, i) => {
      // If it's the first quarter in the year (and not the first quarter), move
      // on to the next year
      if (quarter.get('season') === 'fall' && i > 0) {
        years.push({ quarters: [] });
        yearIndex += 1;
      }
      // Add the quarter to its year
      years[yearIndex].quarters.pushObject(quarter);
    });
    return years;
  }),

  // TODO: make this function smarter, actually checking diff
  setShouldCanSync: Ember.observer('currentTimeline.degreeMinors',
                                'currentTimeline.degreeMajors',
                                'currentTimeline.startingSeason',
                                'user.courses', function() {
    console.log("dashboard: setShouldSync");
    this.set('currentTimeline.sync', true);
  }),

  actions: {
    debugMe() {
      debugger;
    },
    // TODO: Improve this to only reload the currentTimeline instead of all
    //       timelines in the model.
    sync() {
      // Persist sync=true
      var timeline = this.get('currentTimeline');
      timeline.save().then(() => {
        // Reload the record to retrieve the up-to-date quarters mapping
        this.get('model').findBy('isCurrent', true).reload().then((model) => {
          this.set('currentTimeline.sync', false);
          console.log("Timeline reloaded");
        });
      });
    },
    syncit() {
      this.toggleProperty('currentTimeline.sync');
    },
  },
});
