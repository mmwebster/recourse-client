import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),
  subject: attr('string'),
  number: attr('string'),
  units: attr('number'),
  season_fall: attr('boolean'),
  season_winter: attr('boolean'),
  season_spring: attr('boolean'),
  total_units: attr('number'),
  created_at: attr('string'),
  school: belongsTo('school'),
  timelines: hasMany('timeline'),
  concurrent_children: hasMany('course'),
  quarters: hasMany('quarter'),
  nodes: hasMany('node'),
  students: hasMany('student'),
  tree: attr('raw'),

  cid: Ember.computed('subject', 'number', function() {
    return this.get('subject') + this.get('number');
  })
});
