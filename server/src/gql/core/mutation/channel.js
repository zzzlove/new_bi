const mutationDefs = `
  addChannel(name: String!) : Channel
  removeChannel(name: String!) : Boolean
  subscribeChannel(name: String!, subscriberId: ID!) : Boolean
  unsubscribeChannel(name: String!, subscriberId: ID!) : Boolean
`;

const channelMutationDefs = [mutationDefs]
export default channelMutationDefs;
