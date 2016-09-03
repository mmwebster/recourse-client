import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),
  school: belongsTo('school'),
  student: belongsTo('student'),
  timelines: hasMany('timeline'),
  tree: attr('raw'),
});
