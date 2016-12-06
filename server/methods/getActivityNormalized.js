import { Meteor } from 'meteor/meteor'
import Friends from '/imports/collections/Friends'
import Periods from '/imports/collections/Periods'

Meteor.methods({
  getActivityNormalized(partStart, partStop) {
    console.time('getActivityNormalized')

    let out = {
      partStop: partStop || Date.now()
    }

    //
    // get periods
    //
    var query = {
      lastActive: (partStart == null) ? {$ne: NaN} : {$gte: partStart},
      firstActive: (partStop == null) ? {$ne: NaN} : {$lt: out.partStop}
    }
    const periods = Periods.find(query, {
      sort: {lastActive: 1},
      fields: {_id: 1, userID: 1, firstActive: 1, lastActive: 1, finished: 1, isBuddy: 1, statusType: 1}
    }).fetch()
    // console.log('getActivityNormalized: periods', periods)
    //
    // clear periods
    //
    out.periods = periods.map(function(period) {
      return {
        ...period,
        lastActive: (period.finished !== true || period.lastActive == null)
          ? out.partStop
          : period.lastActive
      }
    })

    //
    // add statistics to output
    //
    // out.partStop = (partStop == null) ? periods[periods.length - 1].lastActive : partStop
    const firstActive = (periods.length > 0) ? periods[0].firstActive : 0
    out.partStart = (partStart == null) ? firstActive : partStart

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
