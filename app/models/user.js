import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  school: belongsTo('school'),
  // timelines: hasMany('timeline'),
  nameFirst: attr('string'),
  nameLast: attr('string'),
  signInCount: attr('number'),
  password: attr('string'),
  passwordConfirmation: attr('string'),
  email: attr('string'),

  nameFull: Ember.computed('nameFirst', 'nameLast', function() {
    return this.get('nameFirst') + " " + this.get('nameLast');
  }),
});
