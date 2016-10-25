import Ember from 'ember';

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service('session-account'),
  isRequesting: false,
  // continue disabled if no major is selected
  continueDisabled: true,

  // Stores degreeMajors/Minors to have their remove persisted
  itemsToRemoveOnContinue: [],

  // Stores degreeMajors/Minors to have their addition persisted
  itemsToAddOnContinue: [],

  // Ember-paper doesn't make it easy to use ids for values in forms :/
  findRecordByTitle: function(title, type) {
    if (type === "major") {
      return this.get('sessionAccount.account.school.degreeMajors').findBy('title', title);
    } else {
      return this.get('sessionAccount.account.school.degreeMinors').findBy('title', title);
    }
  },

  actions: {
    updateContinueButton: function(itemsInfo) {
      // set continueDisabled if num degree majors < 1
      let numDegreeMajors = itemsInfo.numItems;
      this.set('continueDisabled', (numDegreeMajors < 1));
    },
    continueOn: function() {
      this.transitionToRoute('user.student.onboard.prior-coursework');
    }
  }
});
