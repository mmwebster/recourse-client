import Devise from 'ember-simple-auth/authenticators/devise';

export default Devise.extend({
  // don't need to customize serverTokenEndpoint since ember app is proxying the
  // Rails API server as :3000
  // serverTokenEndpoint: 'http://localhost:3000/users/sign_in'
});
