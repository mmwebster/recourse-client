import Ember from 'ember';

export default Ember.Controller.extend({
  continueDisabled: false,

  actions: {
    continueOn: function() {
      this.transitionToRoute('user.dashboard');
    }
  }
});
