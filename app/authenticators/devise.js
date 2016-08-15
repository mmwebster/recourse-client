import Devise from 'ember-simple-auth/authenticators/devise';

export default Devise.extend({
  // Don't need to customize serverTokenEndpoint since ember app is proxying for dev
  // and prod is all served through one location
  // serverTokenEndpoint: 'http://localhost:3000/users/sign_in'
});
