import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {
  currentUser: service('current-user'),

  beforeModel() {
    return this._loadCurrentUser();
  },

  sessionAuthenticated() {
    this._loadCurrentUser().catch(() => this.get('session').invalidate());
    // this._super(...arguments);
    if (this.get('session.data.authenticated.sign_in_count') == 1) {
      this.transitionTo('user.onboard.school');
    } else {
      this.transitionTo('user.dashboard');
    }
  },

  _loadCurrentUser() {
    return this.get('currentUser').load();
  }
});
