import facebook from 'facebook-chat-api'
import Credentials from '/imports/collections/Credentials'
import startFriendsObservation from '/server/lib/startFriendsObservation'
import updateFriendsList from '/server/lib/updateFriendsList'
import updateObservationSession from '/server/lib/updateObservationSession'

//
// Login to facebook
//
const loginToFacebook = function(relogin) {
  let latest = Credentials.findOne({}, {sort: {createdAt: -1}})

  // if we have email and password
  if (latest === undefined) {
    throw new Meteor.Error(500, 'No stored credentials found')
  }

  // if we have stored appState and there is no relogin specified
  if (latest.appState != null && relogin !== true) {
    facebook({
      appState: latest.appState
    }, Meteor.bindEnvironment(onFacebookLogin))

  // if we don't have appState, try to login with loigin/password
  } else {
    facebook({
      email: latest.login,
      password: latest.password
    }, Meteor.bindEnvironment(onFacebookLogin))
  }
}

//
// Setup loop
//
const onFacebookLogin = function(error, api) {
  if (error || api == null) {
    console.error('onFacebookLogin error:', error)
    Meteor.setTimeout(function(){
      loginToFacebook(true)
    }, 30000)
    return
  }

  const appState = api.getAppState()
  Credentials.update({
    userID: api.getCurrentUserID()
  },{
    $set: {
      appState,
      updatedAt: Date.now()
    }
  })

  //
  // keep track of when did you abserve your friends
  // and run updates only after cleanups
  //
  updateObservationSession(error, api, function() {
    startFriendsObservation(api)
    updateFriendsList(api)
  })
}

export {loginToFacebook, onFacebookLogin}
