import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  school: belongsTo('school'),
  nameFirst: attr('string'),
  nameLast: attr('string'),
  signInCount: attr('number'),
  password: attr('string'),
  passwordConfirmation: attr('string'),
  email: attr('string'),
  // computed based on sub-class type (student, admin, etc.)
  type: attr('string'),

  nameFull: Ember.computed('nameFirst', 'nameLast', function() {
    return this.get('nameFirst') + " " + this.get('nameLast');
  }),
  isStudent: Ember.computed('type', function() {
    return (this.get('type') === "Student");
  }),
});
