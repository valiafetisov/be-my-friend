@Activity = {


  saveAll: (array)->

    if !array? or !_.isArray(array) or array.length < 0 then return

    array.forEach (user, index)->
      Activity.save(user)


  save: (user)->

    if !user? or typeof user isnt 'object' then return

    prev = Activities.findOne user
    if prev? then return

    console.log "new activity:", user.status, "\t\t", user.userID
    Activities.insert user

}