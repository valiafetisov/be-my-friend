#
# check if the observer was stopped for a long time
# to cleanup db
#
Meteor.startup ->

  latest = Periods.findOne {}, {sort: {lastActive: -1}}
  if !latest? then return

  maxDistance = 10*60*1000 # = 10 minutes
  latestDate = latest.updatedAt or latest.createdAt

  if Date.now() - latestDate > maxDistance

    # close latest session
    latestSession = Sessions.find {start: stop: {$exists: false}}, {sort: {createdAt: -1}}
    if latestSession?
      Sessions.update latestSession._id, {$set: {stop: latestDate, updatedAt: Date.now()}}
    else
      Sessions.insert {stop: latestDate, createdAt: Date.now()}

    # create new session
    Sessions.insert {start: Date.now(), createdAt: Date.now()}

    # cleanup unfinished periods just by closing them
    unfinishedPeriods = Periods.find({finished: {$ne: true}}).fetch();
    if !unfinishedPeriods? then return

    unfinishedPeriods.forEach (each)->

      console.log "period cleaned up:\t", moment(each.firstActive).format('YY.MM.DD HH:mm:ss'), moment(each.lastActive).format('YY.MM.DD HH:mm:ss'), each.userID
      Periods.update each._id, {$set: {finished: true, updatedAt: Date.now()}}

