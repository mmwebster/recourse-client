import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  // full_name: attr('string'),
  // school: belongsTo('school'),
  // timelines: hasMany('timeline'),
  nameFirst: attr('string'),
  nameLast: attr('string'),
  signInCount: attr('number'),
  password: attr('string'),
  passwordConfirmation: attr('string'),
  email: attr('string')
});
