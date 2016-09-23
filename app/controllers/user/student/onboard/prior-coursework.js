import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  continueDisabled: false,
  sessionAccount: service('session-account'),

  actions: {
    continueOn: function() {
      this.transitionToRoute('user.student.dashboard');
    }
  }
});
