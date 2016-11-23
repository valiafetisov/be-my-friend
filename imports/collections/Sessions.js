const Sessions = new Mongo.Collection('observations')

Meteor.startup(function() {
  if (!Meteor.isServer) return
  Sessions._ensureIndex({"firstActive": 1, "lastActive": 1, "createdAt": 1})
})

export default Sessions
