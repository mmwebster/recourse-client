import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  user: Ember.computed('model', function() {
    return this.get('model');
  }),
  displaySignupForm: true,

  actions: {
    submit(user) {
      var _this = this;
      let newUser = this.get('user');
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
