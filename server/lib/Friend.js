import Friends from '/lib/collections/Friends'

const Friend = {

  saveAll(array) {
    if ((array == null) || !_.isArray(array) || array.length < 0) { return }
    return array.forEach((user, index)=> Friend.save(user));
  },

  save(user) {
    if ((user == null) || typeof user !== 'object') { return }
    let prev = Friends.findOne({userID: user.userID})
    if (prev != null) {
      return Friends.update(prev._id, {'$set': user})
    }
    console.log("new friend:", user.userID, "\t\t", user.fullName)
    return Friends.insert(user)
  }

}

export default Friend
