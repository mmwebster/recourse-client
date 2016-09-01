import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  session: service(),

  afterModel() {
    this.get('session').invalidate();
  }
});
