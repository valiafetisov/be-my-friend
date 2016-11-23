import Sessions from '/imports/collections/Sessions'
import Periods from '/imports/collections/Periods'

const updateObservationSession = function(error, success) {
  const now = Date.now()
  const latestSession = Sessions.findOne({}, {sort: {createdAt: -1}})

  //
  // if can't login to facebook:
  // add 'lock' to the current session
  //
  if (error) {
    console.log('updateObservationSession: error')
    if (latestSession === undefined) return
    console.log('updateObservationSession: error + latestSession == undefined')
    return Sessions.update(latestSession._id, {
      $set: {
        updatedAt: now,
        error: true
      }
    })
  }

  //
  // if previous call was with error:
  // check if current is with success or return without update
  //
  if (
    latestSession !== undefined &&
    latestSession.error === true &&
    !success
  ) return console.log('updateObservationSession: return: previous call was with error')

  //
  // if first run:
  // insert new session
  //
  if (latestSession === undefined) {
    console.log('updateObservationSession: first run')
    return Sessions.insert({
      firstActive: now,
      lastActive: now,
      createdAt: now
    })
  }

  //
  // if delay more then limit:
  // cleanup and insert new session
  //
  if (now - latestSession.lastActive > 3 * 60 * 1000) {
    console.log('updateObservationSession: delay more then limit: cleanup and insert new session')

    // cleanup previous periods
    const unfinishedPeriods = Periods.find({finished: {$ne: true}}).fetch()
    if (unfinishedPeriods.length > 0) {
      const ids = unfinishedPeriods.map(e => e._id)
      Periods.update({_id: {$in: ids}}, {
        $set: {
          lastActive: latestSession.lastActive,
          updatedAt: now,
          finished: true
        }
      })
    }

    // insert new
    return Sessions.insert({
      firstActive: now,
      lastActive: now,
      createdAt: now
    })
  }

  //
  // else everything is fine:
  // update session
  //
  console.log('updateObservationSession: delay less then limit: update session')
  Sessions.update(latestSession._id, {
    $set: {
      lastActive: now,
      updatedAt: now,
      error: false
    }
  })
}

export default updateObservationSession
