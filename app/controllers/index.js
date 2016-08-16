import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  sessionAccount: service('session-account'),
  session: service('session'),
});
