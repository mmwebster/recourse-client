import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['confirmation_token'],
  confirmation_token: null,
  ajax: Ember.inject.service(),
  confirming: Ember.computed('confirmation_token', 'confirmed', function() {
    if(!Ember.isEmpty(this.get('confirmation_token')) && this.get('confirmed') === null) {
      return true;
    } else {
      return false;
    }
  }),
  confirmed: null,

  confirmAccount: Ember.observer('confirmation_token', 'model', function() {
    var token = this.get('confirmation_token');
    var _this = this;

    if (!Ember.isEmpty(token)) {
      // Confirm the account
      this.get('ajax').request('/users/confirmation?confirmation_token=' + token).then(function() {
        // Then transition to the login route
        _this.set('confirmed', true);
      }).catch(function(error) {
        _this.set('confirmed', false);
        _this.set('errorMessage', error);
      });
    }
  })
});
