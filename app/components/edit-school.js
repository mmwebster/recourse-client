import Ember from 'ember';

export default Ember.Component.extend({
  title: Ember.computed('account.school', function() {
    return this.get('account.school.title') || "None";
  }),
});
