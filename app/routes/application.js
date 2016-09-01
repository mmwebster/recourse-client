import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {
  sessionAccount: service('session-account'),

  beforeModel() {
    return this._loadCurrentUser();
  },

  sessionAuthenticated() {
    this._loadCurrentUser().then(() => {
      // Transition user to their correct auth route
      switch(this.get('session.data.authenticated.type')) {
        case "Student":
          if (this.get('session.data.authenticated.sign_in_count') === 1) {
            this.transitionTo('user.student.onboard.school');
          } else {
            this.transitionTo('user.student.dashboard');
          }
          break;
        case "Admin":
          this.transitionTo('user.admin.dashboard');
          break;
      }
    }).catch(() => this.get('session').invalidate());
    // this._super(...arguments);
  },

  _loadCurrentUser() {
    return this.get('sessionAccount').loadCurrentUser();
  }
});
