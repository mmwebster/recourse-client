import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  sessionAccount: service('session-account'),
  showDecisionTreeDialog: Ember.computed.not('timeline.treeResolved'),

  actions: {
    closeDecisionTreeDialog: function(response) {
      this.set('timeline.treeResolved', true);
    },
  }
});
