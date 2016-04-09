Template.timeline.helpers {

  points: ->
    return Activities.find {userID: this.userID}, {sort: {lastActive: 1}}

  position: ->
    limits = Session.get 'limits'
    if limits?
      (this.lastActive - limits.start) / (limits.stop - limits.start) * 100
    else
      -100

}

