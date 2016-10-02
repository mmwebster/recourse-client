import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";

const { service } = Ember.inject;

export default Ember.Route.extend(InfinityRoute, {
  sessionAccount: service(),

  perPageParam: "size",              // instead of "per_page"
  pageParam: "number",                  // instead of "page"
  // totalPagesParam: "meta.total",

  model() {
    // TODO: Make this support any school that the admin is a part of
    return this.infinityModel("course", { perPage: 50, startingPage: 2 });
    // return this.get('sessionAccount.account.school').then((school) => {
    //   return school.get('courses');
    // });
  }
});
