fbAPI = null


fbLogin {
    email: Meteor.settings.fbapi.login,
    password: Meteor.settings.fbapi.password
  }, (err, api)->

    if err or !api?
      console.error err
      fbAPI = null
      return

    fbAPI = api


getOnlineUsers = ->
  console.log 'getOnlineUsers fired'

  if !fbAPI? then return console.error "not logged in"

  fbAPI.getOnlineUsers (err, arr)->
    if err or !arr? then return console.error 'online users', err
    Activity.saveAll(arr)


#
# cron that checks for scheduled emails
#
cron = new Meteor.Cron events:
  "* * * * *": getOnlineUsers