@Activity = {


  saveAll: (array)->

    if !array? or !_.isArray(array) or array.length < 0 then return

    array.forEach (user, index)->
      Activity.save(user)


  save: (user)->

    if !user? or typeof user isnt 'object' then return

    prev = Periods.findOne {userID: user.userID}, {sort: {lastActive: -1}}
    # console.log 'prev', prev

    if user.status is 'offline'

      if !prev? or prev.finished is true
        return
      else
        console.log "finished period:\t", moment(prev.firstActive).format('HH:mm:ss'), moment(user.lastActive).format('HH:mm:ss'), user.userID
        update = {
          updatedAt: Date.now()
          lastActive: user.lastActive
          finished: true
        }
        if user.lastActive - prev.firstActive < 10000
          update.dot = true
        Periods.update prev._id, {$set: update}

    else

      if !prev? or prev.finished is true
        console.log "new period:     \t", moment(user.lastActive).format('HH:mm:ss'), user.userID
        Periods.insert {
          userID: user.userID
          firstActive: user.lastActive - 5000
          lastActive: user.lastActive
          createdAt: Date.now()
        }
      else
        console.log "updates period:\t", moment(prev.firstActive).format('HH:mm:ss'), moment(user.lastActive).format('HH:mm:ss'), user.userID
        Periods.update prev._id, {
          $set: {
            lastActive: user.lastActive
            updatedAt: Date.now()
          }
        }

}