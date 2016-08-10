import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service('session'),

  actions: {
    submit: function() {
      let user = this.get('user');
      user.set('signInCount', 0);
      this.attrs.triggerSignUp(user);
    }
  }
});
