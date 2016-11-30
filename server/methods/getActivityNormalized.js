import { Meteor } from 'meteor/meteor'
import Friends from '/imports/collections/Friends'
import Periods from '/imports/collections/Periods'

Meteor.methods({
  getActivityNormalized(from, to) {
    console.time('getActivityNormalized')

    let out = {
      to: to || Date.now()
    }

    //
    // get periods
    //
    var query = {
      lastActive: (from == null) ? {$ne: NaN} : {$gte: from},
      firstActive: (to == null) ? {$ne: NaN} : {$lt: out.to}
    }
    const periods = Periods.find(query, {
      sort: {lastActive: 1},
      fields: {_id: 1, userID: 1, firstActive: 1, lastActive: 1, finished: 1}
    }).fetch()
    // console.log('getActivityNormalized: periods', periods)
    //
    // clear periods
    //
    out.periods = periods.map(function(period) {
      return {
        ...period,
        lastActive: (period.finished !== true || period.lastActive == null)
          ? out.to
          : period.lastActive
      }
    })
    if (periods.length <= 0) return out

    //
    // add statistics to output
    //
    out.length = periods.length
    // out.to = (to == null) ? periods[periods.length - 1].lastActive : to
    out.from = (from == null) ? periods[0].firstActive : from

    //
    // find all friends
    //
    const friends = Friends.find({}, {
      sort: {fullName: 1},
      fields: {_id: 1, userID: 1, fullName: 1}
    }).fetch()
    out.friends = friends

    out.friendsIDs = friends.reduce((ids, friend, index) => {
      ids[friend.userID] = index
      return ids
    }, {})

    console.timeEnd('getActivityNormalized')
    return out
  }
})
