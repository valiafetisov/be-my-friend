import Periods from '/imports/collections/Periods'
import Friends from '/imports/collections/Friends'

const getOverlappingPeriods = function(userID) {
  if (userID === undefined) return []

  const periods = Periods.find({
    lastActive: {$ne: NaN},
    firstActive: {$ne: NaN},
    userID: userID
  }, {
    firstActive: 1
  }).fetch()

  var previous = {}
  const filtered = periods.reduce((array, current) => {
    if (
      previous._id !== undefined &&
      previous.lastActive > current.firstActive
    ) array.push(previous)
    previous = current
    return array
  }, [])

  return filtered
}

const removePeriodsByArray = function(array) {
  if (array === undefined || array.length <= 0) return
  array.forEach(function(e, i) {
    Periods.remove({_id: e._id})
    console.log('period removed:', e)
  })
}

const removeOverlappingPeriods = function() {
  // find friends
  const friends = Friends.find().fetch()

  // iterate by each friend
  friends.forEach(function(e, i) {
    const overlappingPeriods = getOverlappingPeriods(e.userID)
    removePeriodsByArray(overlappingPeriods)
  })
}

export default removeOverlappingPeriods
