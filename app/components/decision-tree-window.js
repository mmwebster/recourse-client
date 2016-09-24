import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  sessionAccount: service('session-account'),
  showDecisionTreeDialog: Ember.computed.alias('enabled'),

  actions: {
    closeDecisionTreeDialog() {
      this.set('timeline.treeResolved', true);
      this.get('timeline').save().then((timeline) => {
        // clear the sync flag
        timeline.set('sync', false);
        timeline.set('treeResolved', false);
        // inform dashboard that it closed
        this.get('onClose')();
        alert('Your timeline has been mapped!');
      })
    },
  }
});
