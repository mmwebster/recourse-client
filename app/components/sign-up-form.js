import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service('session'),

  actions: {
    submit: function() {
      let user = this.get('user');
      this.attrs.triggerSignUp(user);
    }
  }
});
