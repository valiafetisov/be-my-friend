import Friends from '/imports/collections/Friends'
import Periods from '/imports/collections/Periods'
import moment from 'moment'

Meteor.methods({
  getActivityNormalized(limits) {
    console.time('getActivity')

    let out = {
      friends: [],
      now: Date.now()
    }

    // find all friends
    out.friends = Friends.find({}, {
      sort: {fullName: 1},
      fields: {
        userID: 1,
        fullName: 1
      }
    }).fetch()
    if (out.friends.length <= 0) return out

    // if (limits == null) {
    //   limits = {}
    // }
    // if (limits.start == null) {
    //   limits.stop = now
    //   limits.start = limits.stop - (24*60*60*1000)
    // }
    // if (limits.stop == null) {
    //   limits.stop = moment(limits.start).add(1,'days').valueOf()
    // }

    // get all associated periods
    let ids = out.friends.map(each => each.userID)
    out.periods = Periods.find({
      userID: {$in: ids},
      firstActive: {$ne: NaN},
      lastActive: {$ne: NaN}
      // lastActive: {
      //   $gte: limits.start
      //   $lt: limits.stop
      // }
      // finished: true
    }, {
      sort: {lastActive: 1},
      fields: {
        userID: 1,
        firstActive: 1,
        lastActive: 1,
        finished: 1
      }
    }).fetch()
    if (out.periods <= 0) return out

    // add statistics to output
    out.length = out.periods.length
    out.min = out.periods[0].firstActive
    out.max = out.periods[out.periods.length - 1].lastActive

    // out.friends.sort (a, b)-> a.summ - b.summ
    // out.friends = out.friends.slice(out.friends.length - 200)

    console.timeEnd('getActivity')
    return out
  }
})
