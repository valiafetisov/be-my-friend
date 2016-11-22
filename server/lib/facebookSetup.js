import facebook from 'facebook-chat-api'
import Credentials from '/lib/collections/Credentials'
import startFriendsObservation from '/server/lib/startFriendsObservation'
import updateFriendsList from '/server/lib/updateFriendsList'

//
// Login to facebook
//
const loginToFacebook = function(relogin) {
  let latest = Credentials.findOne({}, {sort: {createdAt: -1}})

  // if we have email and password
  if (latest === undefined) {
    throw new Mereor.Error('No stored credentials found')
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
const onFacebookLogin = function(error, api){
  if (error || api == null) {
    console.error('onFacebookLogin error:', error)
    Meteor.setTimeout(function(){
      loginToFacebook(true)
    }, 30000)
  }

  const appState = api.getAppState()
  Credentials.update({
    userID: api.getCurrentUserID()
  },{
    appState,
    updatedAt: Date.now()
  })

  startFriendsObservation(api)
  updateFriendsList(api)
}

export {loginToFacebook, onFacebookLogin}
