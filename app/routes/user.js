import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  // Return the name of the bottom-level route to use in toolbar cookie trail in /user
  beforeModel: function(transition) {
    this.set('transitionPathName', transition.targetName.split('.')[1]);
  },
  model: function() {
    var model = {};
    model.transitionPathName = this.get('transitionPathName');
    return model;
  }
});
