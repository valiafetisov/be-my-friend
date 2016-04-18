Meteor.methods {

  getOneDayActivity: (limits)->

    console.log "getOneDayActivity start", new Date()

    ret = {}
    friends = Friends.find(
      {},
      {
        sort: {fullName: 1}
        limit: 100
      }
    ).fetch()
    ret.data = []
    friends.forEach (each)-> ret.data.push {userID: each.userID, label: each.fullName}
    # if !ids? or ids.length is 0 then return
    # console.log 'data', ret.data
    # return

    if !limits?
      limits = {}
    if !limits.start?
      limits.stop = moment().valueOf()
      limits.start = limits.stop - 24*60*60*1000
    if !limits.stop?
      limits.stop = moment(limits.start).add(1,'days').valueOf()

    ids = ret.data.map (each)-> each.userID

    oneDayActivity = Activities.find({
      userID: {$in: ids}
      lastActive: {
        $gte: limits.start
        $lt: limits.stop
      }
      # status: 'offline'
    }, {
      sort: {lastActive: 1}
      # limit: 1000
    }).fetch()
    # oneDayActivity.sort (a, b)-> parseInt(a.userID) - parseInt(b.userID)

    ret.data.map (each, index)->

      console.log "getOneDayActivity ret.data.map", moment().format('HH:mm:ss'), 'index: '+index

      each.data = []
      oneDayActivity.forEach (eachPoint)->
        if each.userID is eachPoint.userID
          obj = {
            # type: Symbol()
            from: moment(each.lastActive).toDate()
            to: moment(each.createdAt).toDate()
            status: each.status
          }
          # if each.createdAt?
          #   obj.to = moment(each.createdAt).toDate()
          # else
          #   obj.to = moment(each.lastActive).toDate()
          each.data.push obj

      return each

    console.log 'oneDayActivity', ret.data
    console.log "getOneDayActivity stop", new Date()

    return ret

}