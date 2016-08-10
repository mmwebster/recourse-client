import Ember from 'ember';

const { inject: { service }, RSVP, Service, isEmpty } = Ember;

export default Service.extend({
  session: service('session'),
  store: service(),

  load() {
    return new RSVP.Promise((resolve, reject) => {
      const accountId = this.get('session.data.authenticated.id');
      if (!isEmpty(accountId)) {
        return this.get('store').find('user', accountId).then((user) => {
          this.set('user', user);
          resolve();
        }, reject);
      } else {
        console.log("ERROR: could not find user id in session data.");
        resolve();
      }
    });
  }
});

// import Ember from 'ember';
//
// const { inject: { service }, isEmpty, RSVP } = Ember;
//
// export default Ember.Service.extend({
//   session: service('session'),
//   store: service(),
//
//   load() {
//     return new RSVP.Promise((resolve, reject) => {
//       let userId = this.get('session.data.authenticated.user_id');
//       if (!isEmpty(userId)) {
//         return this.get('store').find('user', userId).then((user) => {
//           this.set('user', user);
//         }, reject);
//       } else {
//         resolve();
//       }
//     });
//   }
// });
