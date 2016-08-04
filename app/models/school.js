import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),
  courses: hasMany('course'),
  users: hasMany('user'),
  nodes: hasMany('node')
});
