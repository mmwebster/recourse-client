import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Route.extend({
  session: service('session'),

  actions: {
    click() {
      debugger;
    },
    logout() {
      this.get('session').invalidate();
    }
  }
});
