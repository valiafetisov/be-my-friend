@Periods = new Mongo.Collection('periods')

Meteor.startup ->
  Periods._ensureIndex {"userID": 1, "firstActive": 1, "lastActive": 1}