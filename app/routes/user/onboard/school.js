import Ember from 'ember';

export default Ember.Route.extend({
  sessionAccount: Ember.inject.service('session-account'),

  model: function() {
    var _this = this;
    // get the user's current school
    return this.get('sessionAccount.account.school').then(function(school) {
      // retrieve all school records
      return _this.store.findAll('school').then(function(schools) {
        return {school: school, schools: schools};
      });
    });
  }
});
