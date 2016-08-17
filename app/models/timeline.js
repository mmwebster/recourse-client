import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),
  quarters: hasMany('quarter'),
  courses: hasMany('courses'),
  user: belongsTo('user'),
});
