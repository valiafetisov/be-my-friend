import { Meteor } from 'meteor/meteor'
import Friends from '/imports/collections/Friends'
import Periods from '/imports/collections/Periods'

Meteor.methods({
  exportJSON(filepath) {
    console.log('exportJSON', filepath)
  }
})
