Template.users.onCreated ->

  Session.set 'limits', {
    start: moment('2016-04-10 04:00').valueOf()
    stop: moment('2016-04-10 13:00').valueOf()
  }

  instance = @
  instance.autorun ->

    limits = Session.get 'limits'
    subscription = instance.subscribe 'points', limits


Template.users.helpers {

  users: ->
    return Friends.find {}, {sort: {userID: 1}}

}
