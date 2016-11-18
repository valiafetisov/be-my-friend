import facebook from 'facebook-chat-api'
import Friend from '/server/lib/Friend'
import Activity from '/server/lib/Activity'
import Activities from '/lib/collections/Activities'
import Logins from '/lib/collections/Logins'

Meteor.startup(function() {
  // if (process.env.NODE_ENV === 'development') return
  loginToFacebook()
})

//
// Login to facebook
//
const loginToFacebook = function(relogin) {
  let latest = Logins.findOne({}, {sort: {createdAt: -1}})
  if (latest != null && latest.appState != null && relogin !== true) {
    facebook({
      appState: latest.appState
    }, Meteor.bindEnvironment(onFacebookLogin))
  } else {
    facebook({
      email: Meteor.settings.facebook.login,
      password: Meteor.settings.facebook.password
    }, Meteor.bindEnvironment(onFacebookLogin))
  }
}

//
// Setup
//
const onFacebookLogin = function(error, api){
  if (error || (api == null)) {
    console.error('onFacebookLogin error:', error)
    loginToFacebook(true)
    return
  }

  let appState = api.getAppState()
  if (appState != null) {
    Logins.insert({appState, createdAt: new Date()})
  }

  setupUserStatuses(api)
  updateFriendsList(api)
}

//
// New api for statuses
//
const setupUserStatuses = function(api) {
  api.setOptions({
    selfListen: true,
    updatePresence: true,
    logLevel: 'silent'
  })
  api.listen(Meteor.bindEnvironment(function(err, message, stopListening) {
    if (err) return console.error(err)
    saveUserStatuses(message)
  }))
}

const saveUserStatuses = function(event) {
  Activities.insert(event)
  if (event.type === 'presence') {
    event.status = (event.raw != null && event.raw.a === 2)
      ? 'online'
      : 'offline'
    Activity.save(event)
  }
  console.log('event', event)
}

//
// Update friends collection
//
const updateFriendsList = function(api) {
  api.getFriendsList(Meteor.bindEnvironment(function(error, array) {
    if (error || (array == null)) {
      return console.error("getFriendsList error:", error)
    }
    Friend.saveAll(array)
  }))
}
