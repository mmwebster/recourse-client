import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  season: attr('string'),
  start_date: attr('date'),
  timeline: belongsTo('timeline'),
  courses: hasMany('course')
});
