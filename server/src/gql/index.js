import { coreTypeDefs, coreQueryDefs, coreMutationDefs, coreSubscriptionDefs } from './core';
import { uiTypeDefs, uiQueryDefs, uiMutationDefs, uiSubscriptionDefs } from './ui';
import { biTypeDefs, biQueryDefs, biMutationDefs, biSubscriptionDefs } from './bi';

var typeDefs = [...coreTypeDefs, ...uiTypeDefs, ...biTypeDefs];
var queryDefs = [...coreQueryDefs, ...uiQueryDefs, ...biQueryDefs];
var mutationDefs = [...coreMutationDefs, ...uiMutationDefs, ...biMutationDefs];
var subscriptionDefs = [...coreSubscriptionDefs, ...uiSubscriptionDefs, ...biSubscriptionDefs];

var querys = queryDefs.join('\n');
var mutations = mutationDefs.join('\n');
var subscriptions = subscriptionDefs.join('\n');

var rootQuery = `
type Query {
  ${querys}
}
`;

var rootMutation = `
type Mutation {
  ${mutations}
}
`;

var rootSubscription = `
type Subscription {
  ${subscriptions}
}
`;

var subscriptionKv = subscriptionDefs.length == 0 ? '' : 'subscription: Subscription';

var schema = `
  schema {
    query: Query
    mutation: Mutation
    ${subscriptionKv}
  }
`;

var gqlSchemaDefs = [...typeDefs, rootQuery, rootMutation];
if (subscriptionDefs.length != 0) {
  gqlSchemaDefs.push(rootSubscription);
}
gqlSchemaDefs.push(schema)

export { gqlSchemaDefs };
