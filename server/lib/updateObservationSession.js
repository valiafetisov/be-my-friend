import Sessions from '/imports/collections/Sessions'
import Periods from '/imports/collections/Periods'

const updateObservationSession = function(error, success) {
  const now = Date.now()

  // return if last check was less than second ago
  if (this.previewsCallTime != null && now - this.previewsCallTime < 1000) return

  this.previewsCallTime = now
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
    Sessions.insert({
      firstActive: now,
      lastActive: now,
      createdAt: now
    })
    return
  }

  //
  // if delay more then limit:
  // cleanup and insert new session
  //
  console.log('updateObservationSession: between sessions:', now - latestSession.lastActive, now - latestSession.lastActive > 3 * 60 * 1000)
  if (now - latestSession.lastActive > 3 * 60 * 1000) {
    console.log('updateObservationSession: delay more then limit: cleanup and insert new session')

    // cleanup previous periods
    const unfinishedPeriods = Periods.find({finished: {$ne: true}}).fetch()
    if (unfinishedPeriods.length > 0) {
      unfinishedPeriods.forEach(period => {
        const status = Periods.update(period._id, {
          $set: {
            lastActive: period.updatedAt || period.createdAt,
            updatedAt: now,
            finished: true
          }
        })
        console.log('updateObservationSession: updating unfinishedPeriods:', period._id, status)
      })
    }

    // insert new
    Sessions.insert({
      firstActive: now,
      lastActive: now,
      createdAt: now
    })
    return
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
  return
}

export default updateObservationSession
