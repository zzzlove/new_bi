const typeDefs = `
type Channel {
  id: ID!                # "!" denotes a required field
  name: String
  subscribers: [User]
}`;

const channelTypeDefs = [typeDefs]
export default channelTypeDefs;
