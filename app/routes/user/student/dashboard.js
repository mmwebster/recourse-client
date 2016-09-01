import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Route.extend({
  sessionAccount: service('session-account'),

  model() {
    return this.get('sessionAccount.account.timelines');
  },

  actions: {
    logout() {
      this.get('session').invalidate();
    }
  }
});
