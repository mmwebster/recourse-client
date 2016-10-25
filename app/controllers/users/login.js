import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service('session'),

  showErrorDialog: false,
  errorMessage: null,
  isRequesting: false,

  validations: {
    email: [{
      message: 'Please provide email in a valid format',
      validate: (inputValue) => {
        let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(inputValue);
      }
    }],
    password: [{
      message: 'Your password must longer than 6 characters',
      validate: (inputValue) => {
        if (inputValue && inputValue.length >= 6) {
          return true;
        } else {
          return false;
        }
      }
    }]
  },

  actions: {
    submit: function() {
      let { email, password } = this.getProperties('email', 'password');
      this.set('isRequesting', true);

      return this.get('session').authenticate('authenticator:devise', email, password).catch((reason) => {
        this.set('isRequesting', false);
        this.set('errorMessage', reason.error);
        this.set('showErrorDialog', true);
      });
    },
    closeErrorDialog: function() {
      this.set('showErrorDialog', false);
    }
  }
});
