import { Meteor } from 'meteor/meteor'

const Credentials = new Mongo.Collection('credentials')

if (Meteor.isServer) {
  Meteor.publish('credential', function() {
    return Credentials.find({}, {
      sort: {createdAt: -1},
      limit: 1,
      fields: {online: 1}
    })
  })
}

export default Credentials
