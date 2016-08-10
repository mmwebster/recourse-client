import Ember from 'ember';

const { inject: { service }, RSVP, Service, isEmpty } = Ember;

export default Service.extend({
  session: service('session'),
  store: service(),

  loadCurrentUser() {
    return new RSVP.Promise((resolve, reject) => {
      const id = this.get('session.data.authenticated.id');
      if (!Ember.isEmpty(id)) {
        return this.get('store').find('user', id).then((user) => {
          this.set('account', user);
          console.log("uid is " + user.get('id'));
          resolve();
        }, reject);
      } else {
        resolve();
      }
    });
  }
});
