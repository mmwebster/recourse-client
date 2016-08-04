import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('courses');
  this.route('schools');
  this.route('users');
  this.route('nodes');
  this.route('quarters');
  this.route('timelines');
});

export default Router;
