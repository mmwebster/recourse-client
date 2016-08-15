import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  displaySignupForm: true,

  actions: {
    submit: function() {
      var _this = this;
      let newUser = this.get('model');
      newUser.set('signInCount', 0);

      newUser.save().then(function() {
        alert("You must confirm your email account before you'll be able to login.");
        _this.transitionToRoute('users.confirmation');
      }).catch((error) => {
        _this.set('errorMessage', error);
      });
    }
  }
});
