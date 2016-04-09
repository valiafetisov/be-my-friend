Template.timeline.onCreated ->

  Session.set 'limits', {
    start: moment('2016-04-05 00:00').valueOf()
    stop: moment('2016-04-05 23:59').valueOf()
  }

  instance = @
  instance.autorun ->

    limits = Session.get 'limits'
    subscription = instance.subscribe 'points', limits


Template.timeline.helpers {

  points: ->
    return Activities.find {}, {sort: {lastActive: 1}}

  position: ->
    limits = Session.get 'limits'
    if limits?
      (this.lastActive - limits.start) / (limits.stop - limits.start) * 100
    else
      -100

}

