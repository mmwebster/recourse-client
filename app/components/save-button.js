import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save() {
      this.set('saving', true);
      this.get('model').save().then(() => {
        this.set('saving', false);
      });
    }
  }
});
