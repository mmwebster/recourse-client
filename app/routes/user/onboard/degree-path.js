import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  sessionAccount: service('session-account'),

  model: function() {
    // return user as model
    return this.get('sessionAccount.account');
  }
});
