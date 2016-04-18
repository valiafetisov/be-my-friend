@Activities = new Mongo.Collection('activities')

Meteor.startup ->
  Activities._ensureIndex {"userID": 1, "lastActive": 1}