import Ember from 'ember';

const { isEmpty } = Ember;

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service('session-account'),
  isRequesting: false,
  // continue disabled if no major is selected
  continueDisabled: Ember.computed('model.degreeMajors', function() {
    return isEmpty(this.get('model.degreeMajors'));
  }),

  // Ember-paper doesn't make it easy to use ids for values in forms :/
  findRecordByTitle: function(title, type) {
    if (type === "major") {
      return this.get('model.school.degreeMajors').findBy('title', title);
    } else {
      return this.get('model.school.degreeMinors').findBy('title', title);
    }
  },

  actions: {
    removeDegreeMajor: function(degreeMajor) {
      this.get('model.degreeMajors').removeObject(degreeMajor);
    },
    removeDegreeMinor: function(degreeMinor) {
      this.get('model.degreeMinors').removeObject(degreeMinor);
    },
    addDegreeMajor: function(degreeMajorTitle) {
      var degreeMajor = this.findRecordByTitle(degreeMajorTitle, 'major');
      this.get('model.degreeMajors').addObject(degreeMajor);
    },
    addDegreeMinor: function(degreeMinorTitle) {
      var degreeMinor = this.findRecordByTitle(degreeMinorTitle, 'minor');
      this.get('model.degreeMinors').addObject(degreeMinor);
    },
    saveAndContinue: function() {
      alert("Haven't implemented transition and save yet.");
    }
  }
});
