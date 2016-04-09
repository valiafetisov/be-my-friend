Meteor.startup ->
  loginToFacebook()


#
# Login to facebook
#
loginToFacebook = (relogin)->

  latest = Logins.findOne {}, {sort: {createdAt: -1}}
  if latest?.appState? or relogin
    facebook {
      appState: latest.appState
    }, Meteor.bindEnvironment onFacebookLogin
  else
    facebook {
      email: Meteor.settings.fbapi.login,
      password: Meteor.settings.fbapi.password
    }, Meteor.bindEnvironment onFacebookLogin


#
# Start collecting information
#
onFacebookLogin = (error, api)->

  if error or !api?
    loginToFacebook(true)
    console.error 'onFacebookLogin error:', error
    return

  appState = api.getAppState()
  if appState?
    Logins.insert {appState: appState, createdAt: new Date()}

  Meteor.setInterval ->
    getOnlineUsers(api)
  , 30000


#
# Get list of online users
#
getOnlineUsers = (api)->

  if !api?
    console.error "getOnlineUsers error: no api object present"
    return

  api.getOnlineUsers Meteor.bindEnvironment (error, array)->

    if error or !array?
      console.error 'getOnlineUsers error: error getting users', error
      loginToFacebook(true)
      return

    Activity.saveAll(array)

