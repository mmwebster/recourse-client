import User from '../models/user';
import { hasMany } from 'ember-data/relationships';

export default User.extend({
  degreeMajors: hasMany('degreeMajor'),
  degreeMinors: hasMany('degreeMinor'),
  courses: hasMany('course'), // prior coursework
});
