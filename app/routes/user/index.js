import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  sessionAccount: service(), // sessionAccount b/c must be auth'd already

  afterModel() {
    switch(this.get('sessionAccount.account.type')) {
      case 'Student':
        this.transitionTo('user.student.dashboard');
        break;
      case 'Admin':
        this.transitionTo('user.admin.dashboard');
        break;
    }
  }
});
