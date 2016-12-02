import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

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

  Meteor.publish('periods/first', function() {
    return Periods.find({firstActive: {$ne: NaN}}, {
      sort: {firstActive: 1},
      limit: 1,
      fields: {firstActive: 1}
    })
  })
}

// index
Meteor.startup(function() {
  if (!Meteor.isServer) return
  Periods._ensureIndex({'userID': 1, 'firstActive': 1, 'lastActive': 1})
})

export default Periods
