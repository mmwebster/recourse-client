import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  sessionAccount: service(),

  model() {
    return this.get('sessionAccount.account.school').then((school) => {
      return school.get('degreeMinors');
    });
  }
});
