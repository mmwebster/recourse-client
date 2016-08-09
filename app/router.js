import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  // ***********************
  // Authenticated Routes
  // ***********************
  this.route('user', function() {
    this.route('dashboard');
    this.route('settings');
    this.route('onboard', function() {
      this.route('school');
      this.route('degree-path');
      this.route('prior-coursework');
    });
  });
  // temporary debugging routes
  this.route('models', function() {
    this.route('courses');
    this.route('schools');
    this.route('nodes');
    this.route('quarters');
    this.route('timelines');
  });

  // ***********************
  // Unauthenticated Routes
  // ***********************
  this.route('users', function() {
    this.route('sign-up');
    this.route('confirmation');
    this.route('login');
  });

  // ***********************
  // Standard Routes
  // ***********************
  // catchall route for 404
  this.route('page-not-found', { path: '/*wildcard' });
});

export default Router;
