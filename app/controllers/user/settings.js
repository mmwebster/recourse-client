import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service('session'),
  sessionAccount: service('session-account'),
  showLogoutDialog: false,

  actions: {
    openLogoutDialog: function() {
      this.set('showLogoutDialog', true);
    },
    closeLogoutDialog: function(response) {
      if (response ===  "cancel") {
        this.set('showLogoutDialog', false);
      } else {
        this.get('session').invalidate();
      }
    },
  }
});
