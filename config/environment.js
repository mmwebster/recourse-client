/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'reqourse-client',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',

    // maybe need to install ember-cli-contents-security-policy
    contentSecurityPolicy: {
      'connect-src': "*"
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  // For every environment
  ENV['ember-simple-auth'] = {
    authenticationRoute: 'users.login',
    routeAfterAuthentication: 'user.dashboard',
    routeIfAlreadyAuthenticated: 'user.dashboard'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
