import Ember from 'ember';

const { inject: { service }, RSVP, Service, isEmpty } = Ember;

export default Service.extend({
  session: service('session'),
  store: service(),

  loadCurrentUser() {
    return new RSVP.Promise((resolve, reject) => {
      if (this.get('session.isAuthenticated')) {
        // is authenticated
        var type = this.get('session.data.authenticated.type');
        var id;
        switch(type) {
          case 'Student':
            // type is student
            id = this.get('session.data.authenticated.id');
            if (!isEmpty(id)) {
              return this.get('store').find('student', id).then((user) => {
                this.set('account', user);
                console.log("SID: " + user.get('id'));
                resolve();
              }, reject);
            } else {
              resolve();
            }
            break;
          case 'Admin':
            // type is student
            id = this.get('session.data.authenticated.id');
            if (!isEmpty(id)) {
              return this.get('store').find('admin', id).then((user) => {
                this.set('account', user);
                console.log("AID: " + user.get('id'));
                resolve();
              }, reject);
            } else {
              resolve();
            }
            break;
          default:
            throw 'ERROR: invalid user type';
        }
      } else {
        resolve();
      }
    });
  }
});
