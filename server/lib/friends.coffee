@Friend = {


  saveAll: (array)->

    if !array? or !_.isArray(array) or array.length < 0 then return

    array.forEach (user, index)->
      Friend.save user


  save: (user)->

    if !user? or typeof user isnt 'object' then return

    prev = Friends.findOne {userID: user.userID}
    if prev?
      return Friends.update prev._id, {'$set': user}

    console.log "new friend:", user.userID, "\t\t", user.fullName
    Friends.insert user


}