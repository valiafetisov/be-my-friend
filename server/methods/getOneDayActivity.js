import Friends from '/imports/collections/Friends'
import Periods from '/imports/collections/Periods'
import moment from 'moment'

Meteor.methods({
  getOneDayActivity(limits) {
    console.log('getOneDayActivity start')

    let ret = {}
    let friends = Friends.find({},
      {
        sort: {fullName: 1}
        // limit: 100
      }
    ).fetch()
    ret.rows = []
    friends.forEach(each=> ret.rows.push({userID: each.userID, label: each.fullName}))

    if (limits == null) {
      limits = {}
    }
    if (limits.start == null) {
      limits.stop = moment().valueOf()
      limits.start = limits.stop - (24*60*60*1000)
    }
    if (limits.stop == null) {
      limits.stop = moment(limits.start).add(1,'days').valueOf()
    }

    let ids = ret.rows.map(each=> each.userID)

    let oneDayActivity = Periods.find({
      userID: {$in: ids},
      // lastActive: {
      //   $gte: limits.start
      //   $lt: limits.stop
      // }
      finished: true
    }, {
      sort: {lastActive: 1}
      // limit: 1000
    }).fetch()

    ret.length = oneDayActivity.length
    ret.min = oneDayActivity[0].firstActive
    // ret.max = oneDayActivity[ret.length-1].lastActive
    ret.max = Date.now()

    let now = moment().toDate()
    ret.rows.map(function(each, index) {

      // console.log "getOneDayActivity ret.rows.map", moment().format('HH:mm:ss'), 'index: '+index

      each.data = []
      each.summ = 0
      oneDayActivity.forEach(function(eachPoint){
        if (each.userID !== eachPoint.userID) return

        // hide periods longer than 200 minuts
        if (eachPoint.lastActive - eachPoint.firstActive > 200 * 60 * 1000) return

        let obj = {
          // type: Symbol()
          from: eachPoint.firstActive,
          to: eachPoint.lastActive
          // status: eachPoint.status
        }
        if (eachPoint.finished !== true) {
          obj.to = now;
        }
        each.summ += (eachPoint.lastActive || Date.now()) - eachPoint.firstActive

        return each.data.push(obj)
      })
      return each
    })

    // ret.rows.sort (a, b)-> a.summ - b.summ
    // ret.rows = ret.rows.slice(ret.rows.length - 200)

    // console.log 'oneDayActivity', ret.data
    console.log('getOneDayActivity stop', new Date())

    return ret
  }
})
