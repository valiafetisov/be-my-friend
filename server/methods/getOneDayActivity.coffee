Meteor.methods {

  getOneDayActivity: (limits)->

    console.log "getOneDayActivity start", new Date()

    ret = {}
    friends = Friends.find(
      {
      },
      {
        sort: {fullName: 1}
        limit: 100
      }
    ).fetch()
    ret.data = []
    friends.forEach (each)-> ret.data.push {userID: each.userID, label: each.fullName}


    if !limits?
      limits = {}
    if !limits.start?
      limits.stop = moment().valueOf()
      limits.start = limits.stop - 24*60*60*1000
    if !limits.stop?
      limits.stop = moment(limits.start).add(1,'days').valueOf()

    ids = ret.data.map (each)-> each.userID

    oneDayActivity = Periods.find({
      userID: {$in: ids}
      lastActive: {
        $gte: limits.start
        $lt: limits.stop
      }
      # finished: true
    }, {
      sort: {lastActive: 1}
      # limit: 1000
    }).fetch()

    ret.length = oneDayActivity.length

    now = moment().toDate()
    ret.data.map (each, index)->

      console.log "getOneDayActivity ret.data.map", moment().format('HH:mm:ss'), 'index: '+index

      each.data = []
      oneDayActivity.forEach (eachPoint)->
        if each.userID is eachPoint.userID
          obj = {
            # type: Symbol()
            from: moment(eachPoint.firstActive).toDate()
            to: moment(eachPoint.lastActive).toDate()
            # status: eachPoint.status
          }
          if eachPoint.finished isnt true
            obj.to = now
          each.data.push obj
      return each

    # console.log 'oneDayActivity', ret.data
    console.log "getOneDayActivity stop", new Date()

    return ret

}