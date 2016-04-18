Meteor.startup ->
  # if process.env.NODE_ENV isnt "development"
  loginToFacebook()


#
# Login to facebook
#
loginToFacebook = (relogin)->

  latest = Logins.findOne {}, {sort: {createdAt: -1}}
  if latest?.appState? and relogin isnt true
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

  getFriendsList(api)


#
#
#
getFriendsList = (api)->
  api.getFriendsList Meteor.bindEnvironment (error, array)->
    if error or !array? then return console.error "getFriendsList error:", error
    # console.log "getFriendsList", array
    Friend.saveAll(array)


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

