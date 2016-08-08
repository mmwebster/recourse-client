import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['confirmation_token'],
  confirmation_token: null,
  ajax: Ember.inject.service(),

  confirmAccount: Ember.observer('confirmation_token', 'model', function() {
    var token = this.get('confirmation_token');
    var _this = this;

    if (token !== "") {
      // Confirm the account
      this.get('ajax').request('/users/confirmation?confirmation_token=' + token).catch(function(err) {
        console.log("ERROR: " + err);
      }).then(function() {
        // Then transition to the login route
        alert("Your account has successfully been actived.");
        _this.transitionToRoute('users.login');
      });
    }
  })
});
