import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  season: attr('string'),
  startDate: attr('date'),
  timeline: belongsTo('timeline'),
  courses: hasMany('course'),

  // compute the startDate into a start year
  startYear: Ember.computed('startDate', function() {
    return this.get('startDate').getFullYear();
  }),
});
