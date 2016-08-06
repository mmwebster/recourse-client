import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  // Application specific overrides go here
  namespace: 'api/v1',
  // Use Devise authorizer, application wide
  authorizer: 'authorizer:devise'
});
