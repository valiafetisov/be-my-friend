@Activity = {


  saveAll: (array)->

    if !array? or !_.isArray(array) or array.length < 0 then return

    array.forEach (user, index)->
      Activity.save(user)


  save: (user)->

    if !user? or typeof user isnt 'object' then return

    prev = Activities.findOne {
      userID: user.userID
      lastActive: user.lastActive
    }
    if prev? then return

    console.log "new activity:", user.status, "\t\t", user.userID
    user.createdAt = Date.now()
    Activities.insert user


}