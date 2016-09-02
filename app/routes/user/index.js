import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  session: service(), // sessionAccount b/c must be auth'd already

  afterModel() {
    switch(this.get('session.data.authenticated.type')) {
      case 'Student':
        this.transitionTo('user.student.dashboard');
        break;
      case 'Admin':
        this.transitionTo('user.admin.dashboard');
        break;
      default:
        throw 'ERROR: user account type is invalid.';
    }
  }
});
