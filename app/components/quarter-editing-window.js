import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  sessionAccount: service('session-account'),
  isRequesting: false,
  totalUnits: Ember.computed('quarter.courses', function() {
    var totalUnits = 0;
    this.get('quarter.courses').forEach((course) => {
      totalUnits += course.get('units');
    });
    return totalUnits;
  }),

  validations: {
    maxUnits: [{
      message: 'Please provide a number between 0 and 30',
      validate: (inputValue) => {
        return (inputValue >= 0) && (inputValue <= 30);
      }
    }]
  },

  actions: {
    submit() {
      this.set('isRequesting', true);
      this.get('quarter').save().then(() => {
        this.set('isRequesting', false);
        this.get('onClose')();
      });
    },
    cancel() {
      this.get('onClose')();
    }
  }
});
