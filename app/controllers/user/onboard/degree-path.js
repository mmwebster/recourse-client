import Ember from 'ember';

const { isEmpty } = Ember;

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service('session-account'),
  isRequesting: false,
  continueDisabled: true,

  // Ember-paper doesn't make it easy to use ids for values in forms :/
  findRecordByTitle: function(title, type) {
    if (type === "major") {
      return this.get('model.school.degreeMajors').findBy('title', title);
    } else {
      return this.get('model.school.degreeMinors').findBy('title', title);
    }
  },


       /*
        *
        *
        * left off adding in he findRecord stuff and then need to put into actions to
        * limit code duplication and then should be able to just remove/add the objects in 
        * each action and the save the record all together (user) when the user presses contineu
        *
        *
        * */



  actions: {
    removeDegreeMajor: function(degreeMajor) {
      this.get('model.degreeMajors').removeObject(degreeMajor);
    },
    removeDegreeMinor: function(degreeMinor) {
      debugger;
      this.get('model.degreeMinors').removeObject(degreeMinor);
    },
    addDegreeMajor: function(degreeMajor) {
      debugger;
      this.get('school.degreeMajors').addObject(degreeMajor);
    },
    addDegreeMinor: function(degreeMinor) {
      debugger;
      this.get('school.degreeMinors').addObject(degreeMinor);
    },
    saveAndContinue: function() {
      alert("Haven't implemented transition and save yet.");
    }
  }
});
