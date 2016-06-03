Meteor.methods {

  getOneDayActivity: (limits)->

    console.log "getOneDayActivity start", new Date()

    ret = {}
    friends = Friends.find(
      {
      },
      {
        sort: {fullName: 1}
        # limit: 100
      }
    ).fetch()
    ret.rows = []
    friends.forEach (each)-> ret.rows.push {userID: each.userID, label: each.fullName}


    if !limits?
      limits = {}
    if !limits.start?
      limits.stop = moment().valueOf()
      limits.start = limits.stop - 24*60*60*1000
    if !limits.stop?
      limits.stop = moment(limits.start).add(1,'days').valueOf()

    ids = ret.rows.map (each)-> each.userID

    oneDayActivity = Periods.find({
      userID: {$in: ids}
      # lastActive: {
      #   $gte: limits.start
      #   $lt: limits.stop
      # }
      finished: true
    }, {
      sort: {lastActive: 1}
      # limit: 1000
    }).fetch()

    ret.length = oneDayActivity.length
    ret.min = oneDayActivity[0].firstActive
    ret.max = oneDayActivity[ret.length-1].lastActive
    # ret.max = Date.now()

    now = moment().toDate()
    ret.rows.map (each, index)->

      # console.log "getOneDayActivity ret.rows.map", moment().format('HH:mm:ss'), 'index: '+index

      each.data = []
      each.summ = 0
      oneDayActivity.forEach (eachPoint)->
        if each.userID is eachPoint.userID
          obj = {
            # type: Symbol()
            from: eachPoint.firstActive
            to: eachPoint.lastActive
            # status: eachPoint.status
          }
          if eachPoint.finished isnt true
            obj.to = now
          each.summ += (eachPoint.lastActive or Date.now()) - eachPoint.firstActive
          each.data.push obj
      return each

    # ret.rows.sort (a, b)-> a.summ - b.summ
    # ret.rows = ret.rows.slice(ret.rows.length - 200)

    # console.log 'oneDayActivity', ret.data
    console.log "getOneDayActivity stop", new Date()

    return ret

}