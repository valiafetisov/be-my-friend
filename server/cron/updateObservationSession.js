import cron from 'node-cron'
import { Meteor } from 'meteor/meteor'
import updateObservationSession from '/server/lib/updateObservationSession'

// run every minute
cron.schedule('*/1 * * * *', Meteor.bindEnvironment(function() {
  console.log('cron: updateObservationSession')
  updateObservationSession()
}))
