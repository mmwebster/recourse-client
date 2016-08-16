import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service('session'),

  showErrorDialog: false,
  errorMessage: null,
  isRequesting: false,

  passwordBaseValidation: {
    message: 'Your password must longer than 6 characters',
    validate: (inputValue) => {
      if (inputValue && inputValue.length >= 6) {
        return true;
      } else {
        return false;
      }
    }
  },

  validations: {
    name: [{
      message: 'This field is required',
      validate: (inputValue) => {
        if (inputValue && inputValue.length >= 1) {
          return true;
        } else {
          return false;
        }
      }
    }],
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
      var _this = this;
      let newUser = this.get('model');
      newUser.set('signInCount', 0);
      this.set('isRequesting', true);

      newUser.save().then(function() {
        _this.set('isRequesting', false);
        _this.transitionToRoute('users.confirmation');
      }).catch((error) => {
        _this.set('isRequesting', false);
        _this.set('errorMessage', error);
        _this.set('showErrorDialog', true);
      });
    },
    closeErrorDialog: function() {
      this.set('showErrorDialog', false);
    }
  }
});
