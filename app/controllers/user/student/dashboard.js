import Ember from 'ember';

const { inject: { service }, isEmpty } = Ember;

export default Ember.Controller.extend({
  sessionAccount: service('session-account'),

  // rename properties for readability sake
  timelines: Ember.computed.alias('model'),
  user: Ember.computed.alias('sessionAccount.account'),
  syncDisabled: Ember.computed.not('currentTimeline.sync'),
  syncingInProgress: false,
  decisionTreeResolved: true,
  currentTimelineTotalCourses: 0, // set by totalUnits to reduce num computed props
  currentTimelineTotalUnits: Ember.computed('currentTimeline.quarters.@each.courses', function() {
    var totalUnits = 0;
    var totalCourses = 0;

    this.get('currentTimeline.quarters').forEach((quarter) => {
      totalCourses += quarter.get('courses.length');
      quarter.get('courses').forEach((course) => {
        totalUnits += course.get('units');
      });
    });

    this.set('currentTimelineTotalCourses', totalCourses);

    return totalUnits;
  }),

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
  currentYears: Ember.computed('currentTimeline.quarters.@each.courses', function() {
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


  quarterEditing: null,
  quarterEditingWindowEnabled: false,

  actions: {
    debugMe() {
      debugger;
    },
    // resolve
    // TODO: Improve this to only reload the currentTimeline instead of all
    //       timelines in the model.
    sync() {
      // Change sync button to loading
      this.set('syncingInProgress', true);
      // Fetch updated timeline
      this.get('currentTimeline').save().then(() => {
        this.set('syncingInProgress', false);
        // Open the decision tree
        this.set('decisionTreeWindowEnabled', true);
        // upon confirming decision tree, the component resaves the timeline
        // which ends up clearing both sync and tree-resolved flags
      });
    },
    syncit() {
      this.toggleProperty('currentTimeline.sync');
    },
    decisionTreeWindowDidClose() {
      this.set('decisionTreeWindowEnabled', false);
      // reload timeline record
      // TODO: instead of reloading records, should ideally just get back the
      //       updated record from the previous request to the API when it maps.
      //       API would need to set on params send to jsonapi-resources
      this.get('currentTimeline.quarters').forEach((quarter) => {
        quarter.get('courses').reload();
      });
    },
    openQuarterSettings(quarter) {
      this.set('quarterEditing', quarter);
      this.set('quarterEditingWindowEnabled', true);
    },
    quarterEditingWindowDidClose() {
      this.set('quarterEditingWindowEnabled', false);
      this.set('currentTimeline.sync', true);
    }
  },
});
