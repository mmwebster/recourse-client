import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service('session'),

  actions: {
    logout: function() {
      alert("Add dialogue prompting user to confirm logout decision (ember-paper)");
      this.get('session').invalidate();
    }
  }
});
