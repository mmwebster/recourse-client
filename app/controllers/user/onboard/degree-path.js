import Ember from 'ember';

const { isEmpty } = Ember;

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service('session-account'),
  school: {
    degreeMajors: [{id: 1, title: "Major 1"},{id: 2, title: "Major 2"}],
    degreeMinors: [{id: 3, title: "Minor 1"},{id: 4, title: "Minor 2"}],
  },

  actions: {
    deleteDegreeMajor: function(degreeMajor) {
      this.get('school.degreeMajors').removeObject(degreeMajor);
    },
    deleteDegreeMinor: function(degreeMinor) {
      this.get('school.degreeMinors').removeObject(degreeMinor);
    }
  }
});
