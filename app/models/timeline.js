import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),
  quarters: hasMany('quarter'),
  // Possible remove this. It was from when I thought that Timeline would own
  // priorCoursework, but it makes more sense to bind that to User.
  courses: hasMany('courses'),
  user: belongsTo('user'),
  isCurrent: attr('boolean'),
  startingSeason: attr('string'),
  degreeMajors: hasMany('degreeMajor'),
  degreeMinors: hasMany('degreeMinor'),
});
