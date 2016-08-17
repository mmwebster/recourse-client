import Ember from 'ember';

const { isEmpty } = Ember;

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service('session-account'),
  continueDisabled: true,
  isRequesting: false,
  // retrieved from the store
  persistedSchoolTitle: Ember.computed('model.school.title', function() {
    this.set('continueDisabled', false);
    return this.get('model.school.title');
  }),
  // retrieved from user input
  selectedSchoolTitle: null,
  // displayed to user
  displayedSchoolTitle: Ember.computed('persistedSchoolTitle', 'selectedSchoolTitle', function() {
    if (this.get('selectedSchoolTitle') === null) {
      return this.get('persistedSchoolTitle');
    } else {
      return this.get('selectedSchoolTitle');
    }
  }),

  schoolDidChange: Ember.observer('displayedSchoolTitle', function() {
    if (!isEmpty(this.get('displayedSchoolTitle'))) {
      this.set('continueDisabled', false);
    }
  }),
  user: null,

  actions: {
    saveAndContinue: function() {
      this.set('isRequesting', true);
      var _this = this;
      if (!isEmpty(this.get('displayedSchoolTitle'))) {
        // selection present
        var displayedSchoolTitle = this.get('displayedSchoolTitle');
        var selectedSchool = this.get('model.schools').findBy('title', displayedSchoolTitle);

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
