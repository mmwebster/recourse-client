import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    transitionToCourse(id) {
      this.transitionToRoute('user.admin.course', id);
    }
  }
});
