import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  displaySignupForm: true,

  actions: {
    signUp(user) {
      let newUser = user;
      var _this = this
      newUser.save().catch((error) => {
        alert("Error: " + error);
        this.set('errorMessage', error);
      }).then(function() {
        alert("You must confirm your email account before you'll be able to login.");
        _this.set('displaySignupForm', false);
      });
      // this.transitionToRoute('login')
      // .then((user) => {
      //   this.get('session')
      //   .authenticate('authenticator:devise',
      //     user.get('email'), user.get('password'))
      //   .catch((reason) => {
      //     this.set('errorMessage', reason.error || reason);
      //   });
      // });
    }
  }
});
