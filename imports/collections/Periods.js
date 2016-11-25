const Periods = new Mongo.Collection('periods')

// publish
if (Meteor.isServer) {
  Meteor.publish('periods', function() {
    return Periods.find({}, {
      sort: {createdAt: 1},
      fields: {createdAt: 0, updatedAt: 0}
    })
  })

  Meteor.publish('periods/online', function() {
    return Periods.find({finished: {$ne: true}}, {
      sort: {createdAt: 1},
      fields: {createdAt: 0, updatedAt: 0}
    })
  })
}

// index
Meteor.startup(function() {
  if (!Meteor.isServer) return
  Periods._ensureIndex({"userID": 1, "firstActive": 1, "lastActive": 1})
})

export default Periods
