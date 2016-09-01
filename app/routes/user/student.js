import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  sessionAccount: service('session-account'),

  model() {
    return this.get('sessionAccount.account.timelines').then((timelines) => {
      return timelines.findBy('isCurrent', true);
    });
  }
});
