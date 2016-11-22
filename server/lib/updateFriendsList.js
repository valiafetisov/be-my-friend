import { Meteor } from 'meteor/meteor'
import Friends from '/imports/collections/Friends'

//
// Update friends collection
//
const updateFriendsList = function(api) {
  api.getFriendsList(Meteor.bindEnvironment(function(error, array) {
    if (error || (array == null)) {
      return console.error("getFriendsList: error:", error)
    }
    saveAllFriends(array)
  }))
}

const saveAllFriends = function(array) {
  if ((array == null) || !_.isArray(array) || array.length < 0) return
  return array.forEach(saveFriend)
}

const saveFriend = function(friend) {
  if (friend == null || typeof friend !== 'object') return

  // update if exist
  let prev = Friends.findOne({userID: friend.userID})
  if (prev != null) {
    return Friends.update(prev._id, {'$set': friend})
  }

  console.log("new friend:", friend.userID, "\t\t", friend.fullName)
  return Friends.insert(friend)
}

export default updateFriendsList
