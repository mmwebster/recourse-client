import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  sessionAccount: service('session-account'),
  isRequesting: false,

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
      this.get('quarter').save().then((quarter) => {
        this.set('isRequesting', false);
        this.get('onClose')();
      })
    },
    cancel() {
      this.get('onClose')();
    }
  }
});
