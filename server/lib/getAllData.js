import Periods from '/imports/collections/Periods'
import Friends from '/imports/collections/Friends'
import Sessions from '/imports/collections/Sessions'
import Credentials from '/imports/collections/Credentials'

const getAllData = function() {
  console.time('getAllData')

  const exportedAt = Date.now()

  //
  // get all periods
  //
  const periods = Periods.find({
    lastActive: {$ne: NaN},
    firstActive: {$ne: NaN}
  }, {
    sort: {lastActive: 1}
  }).fetch()

  //
  // get all friends
  //
  const friends = Friends.find({}, {
    sort: {fullName: 1}
  }).fetch()

  //
  // get all sessions
  //
  const sessions = Sessions.find({}, {
    sort: {lastActive: 1}
  }).fetch()

  //
  // get current userID
  //
  const credential = Credentials.findOne({}, {sort: {createdAt: -1}})
  const userID = (credential === undefined) ? null : credential.userID

  console.timeEnd('getAllData')

  return {
    createdBy: userID,
    exportedAt,
    friends,
    periods,
    sessions
  }
}

export default getAllData
