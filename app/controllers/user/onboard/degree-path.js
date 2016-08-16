import Ember from 'ember';

const { isEmpty } = Ember;

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service('session-account'),
});
