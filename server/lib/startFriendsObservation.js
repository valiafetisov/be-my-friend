import moment from 'moment'
import { Meteor } from 'meteor/meteor'
import Periods from '/imports/collections/Periods'

//
// setup friends observation
//
const startFriendsObservation = function(api) {
  api.setOptions({
    selfListen: true,
    updatePresence: true,
    logLevel: 'silent'
  })
  api.listen(Meteor.bindEnvironment(function(err, message, stopListening) {
    if (err) return console.error(err)
    onNewEvent(message)
  }))
}

const onNewEvent = function(event) {
  if (event.type === 'presence') {
    updateFriendPeriod(event)
  }
  console.log('saveFriendsStatuses: event', event)
}

const updateFriendPeriod = function(user) {
  if ((user == null) || typeof user !== 'object') return

  let prev = Periods.findOne({userID: user.userID}, {sort: {lastActive: -1}})
  user.lastActive = user.timestamp

  //
  // new offline friend:
  // finish period if it's offline
  //
  if (user.status === 'offline') {
    if ((prev == null) || prev.finished === true) return
    console.log("finished period:\t", moment(prev.firstActive).format('HH:mm:ss'), moment(user.lastActive).format('HH:mm:ss'), user.userID)
    let update = {
      updatedAt: Date.now(),
      lastActive: user.lastActive,
      finished: true
    }
    if (user.lastActive - prev.firstActive < 10000) {
      update.dot = true
    }
    return Periods.update(prev._id, {$set: update})
  }

  //
  // new online friend:
  // add new period if previous is finished
  //
  if (prev == null || prev.finished === true) {
    console.log("new period:\t", moment(user.lastActive).format('HH:mm:ss'), user.userID);
    return Periods.insert({
      userID: user.userID,
      firstActive: user.lastActive - 5000,
      lastActive: user.lastActive,
      createdAt: Date.now()
    })
  }

  //
  // friend still online:
  // update period if previous not finised
  //
  console.log("updated period:\t", moment(prev.firstActive).format('HH:mm:ss'), moment(user.lastActive).format('HH:mm:ss'), user.userID)
  return Periods.update(prev._id, {
    $set: {
      lastActive: user.lastActive,
      updatedAt: Date.now()
    }
  })
}

export default startFriendsObservation
