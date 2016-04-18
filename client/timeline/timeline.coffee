# Template.timeline.onCreated ->


#   instance = @
#   instance.autorun ->

#     limits = Session.get 'limits'
#     subscription = instance.subscribe 'points', limits


Template.timeline.onRendered ->
  # Session.set 'limits', {
  #   start: moment('2016-04-10 00:00').valueOf()
  #   stop: moment('2016-04-12 1:00').valueOf()
  # }

  # instance = @
  # instance.autorun ->
  limits = Session.get 'limits'

  Meteor.call 'getOneDayActivity', limits, (err, res)->
    if err or !res? then return

    res.data.map (each)->
      if !each.data? then return each
      return each.data.map (eacheach)->
        eacheach.type = TimelineChart.TYPE.INTERVAL
        return eacheach

    console.log 'getOneDayActivity', res

    element = document.getElementById('timeline')
    timeline = new TimelineChart(element, res.data, {
      height: window.innerHeight
      # tip: (d)->
      #   return d.at || d.from+'<br>'+d.to
    })

