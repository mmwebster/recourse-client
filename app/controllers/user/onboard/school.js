import Ember from 'ember';

const { isEmpty } = Ember;

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service('session-account'),
  continueDisabled: true,
  isRequesting: false,
  schoolDidChange: Ember.observer('selectedSchool', function() {
    if (!isEmpty(this.get('selectedSchool'))) {
      this.set('continueDisabled', false);
    }
  }),
  user: null,

  actions: {
    submit: function() {
      this.set('isRequesting', true);
      var _this = this;
      if (!isEmpty(this.get('selectedSchool'))) {
        // selection present
        var selectedSchoolTitle = this.get('selectedSchool');
        var selectedSchool = this.get('model').findBy('title', selectedSchoolTitle);

        // user not fetched
        this.store.findRecord('user', this.get('sessionAccount.account.id')).then(function(user) {
          user.set('school', selectedSchool);
          user.save();
          _this.set('isRequesting', false);
          _this.transitionToRoute('user.onboard.degree-path');
        });

      } else {
        this.set('continueDisabled', true);
        this.set('isRequesting', false);
      }
    }
  }
});
