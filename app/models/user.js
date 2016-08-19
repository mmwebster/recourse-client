import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  school: belongsTo('school'),
  timelines: hasMany('timeline'),
  courses: hasMany('course'), // prior coursework
  nameFirst: attr('string'),
  nameLast: attr('string'),
  signInCount: attr('number'),
  password: attr('string'),
  passwordConfirmation: attr('string'),
  email: attr('string'),
  degreeMajors: hasMany('degreeMajor'),
  degreeMinors: hasMany('degreeMinor'),

  nameFull: Ember.computed('nameFirst', 'nameLast', function() {
    return this.get('nameFirst') + " " + this.get('nameLast');
  }),
});
