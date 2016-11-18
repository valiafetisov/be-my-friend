const Activities = new Mongo.Collection('activities')

Meteor.startup(function() {
  if (!Meteor.isServer) return
  Activities._ensureIndex({'type': 1, 'timestamp': 1, 'userID': 1})
})

export default Activities
