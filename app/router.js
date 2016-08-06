import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  // permament routes
  this.route('login');
  this.route('dashboard');
  this.route('users');

  // temporary debugging routes
  this.route('models', function() {
    this.route('courses');
    this.route('schools');
    this.route('nodes');
    this.route('quarters');
    this.route('timelines');
  });
});

export default Router;
