import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    signUp(user) {
      let newUser = user;
      newUser.save().catch((error) => {
        this.set('errorMessage', error);
      });
      alert("You must confirm your email account before you'll be able to login.")
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
