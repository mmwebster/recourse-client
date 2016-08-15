import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {
  sessionAccount: service('session-account'),

  beforeModel() {
    return this._loadCurrentUser();
  },

  sessionAuthenticated() {
    var _this = this;
    this._loadCurrentUser().then(() => {
      if (_this.get('session.data.authenticated.sign_in_count') === 1) {
        _this.transitionTo('user.onboard.school');
      } else {
        _this.transitionTo('user.dashboard');
      }
    }).catch(() => this.get('session').invalidate());
    // this._super(...arguments);
  },

  _loadCurrentUser() {
    return this.get('sessionAccount').loadCurrentUser();
  }
});
