import Ember from 'ember';

const { isEmpty } = Ember;

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service('session-account'),
  school: {
    degreeMajors: [{title: "Major 1"},{title: "Major 2"}],
    degreeMinors: [{title: "Minor 1"},{title: "Minor 2"}],
  },
});
