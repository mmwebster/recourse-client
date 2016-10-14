import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  sessionAccount: service('session-account'),
  isRequesting: false,

  seasonsOffered: Ember.computed('course.seasonFall', 'course.seasonWinter', 'course.seasonSpring', function() {
    var seasonsOffered = [];
    var seasonsOfferedStr = " ";
    // Push all seasons
    if (this.get('course.seasonFall')) {
      seasonsOffered.push("Fall");
    }
    if (this.get('course.seasonWinter')) {
      seasonsOffered.push("Winter");
    }
    if (this.get('course.seasonSpring')) {
      seasonsOffered.push("Spring");
    }

    // Format based on what was pushed
    if (seasonsOffered.length === 0) {
      seasonsOfferedStr = "Course not currently offered.";
    } else {
      seasonsOffered.forEach((season, i) => {
        seasonsOfferedStr += season;
        if (i < seasonsOffered.length - 1) {
          seasonsOfferedStr += ", ";
        }
      });
    }

    return seasonsOfferedStr;
  }),

  validations: {
    maxUnits: [{
      message: 'Please provide a number between 0 and 30',
      validate: (inputValue) => {
        return (inputValue >= 0) && (inputValue <= 30);
      }
    }]
  },

  actions: {
    submit() {
      this.set('isRequesting', true);
      this.get('quarter').save().then((quarter) => {
        this.set('isRequesting', false);
        this.get('onClose')();
      })
    },
    cancel() {
      this.get('onClose')();
    }
  }
});
