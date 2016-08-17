import Ember from 'ember';

const { isEmpty } = Ember;

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service('session-account'),
  isRequesting: false,
  // continue disabled if no major is selected
  continueDisabled: Ember.computed('model.degreeMajors', function() {
    return isEmpty(this.get('model.degreeMajors'));
  }),

  // Stores degreeMajors/Minors to have their remove persisted
  itemsToRemoveOnContinue: [],

  // Stores degreeMajors/Minors to have their addition persisted
  itemsToAddOnContinue: [],

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
      // remove from UI
      this.get('model.degreeMajors').removeObject(degreeMajor);
      // push to removal list
      this.get('itemsToRemoveOnContinue').addObject(degreeMajor);
    },
    removeDegreeMinor: function(degreeMinor) {
      // remove from UI
      this.get('model.degreeMinors').removeObject(degreeMinor);
      // push to removal list
      this.get('itemsToRemoveOnContinue').addObject(degreeMinor);
    },
    addDegreeMajor: function(degreeMajorTitle) {
      var degreeMajor = this.findRecordByTitle(degreeMajorTitle, 'major');
      this.get('model.degreeMajors').pushObject(degreeMajor);
      // push to add list
      this.get('itemsToAddOnContinue').addObject(degreeMajor);
    },
    addDegreeMinor: function(degreeMinorTitle) {
      var degreeMinor = this.findRecordByTitle(degreeMinorTitle, 'minor');
      this.get('model.degreeMinors').pushObject(degreeMinor);
      // push to add list
      this.get('itemsToAddOnContinue').addObject(degreeMinor);
    },
    saveAndContinue: function() {
      // set user feedback
      this.get('isRequesting', true);

      // get the removal/addition lists
      let removals = this.get('itemsToRemoveOnContinue');
      let additions = this.get('itemsToAddOnContinue');
      // retrieve unpersisted objects and save them
      removals.forEach(function(item) {
        item.save();
      });
      additions.forEach(function(item) {
        item.save();
      });

      // clear user feedback and transition
      this.get('isRequesting', false);
      this.transitionToRoute('user.onboard.prior-coursework');
    }
  }
});
