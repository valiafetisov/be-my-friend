const Friends = new Mongo.Collection('friends')

// publish
if (Meteor.isServer) {
  Meteor.publish('friends', function() {
    return Friends.find({}, {
      sort: {createdAt: 1},
      fields: {createdAt: 0, updatedAt: 0}
    })
  })
}

export default Friends