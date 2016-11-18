import moment from 'moment'
import Periods from '/lib/collections/Periods'

const Activity = {

  saveAll(array) {
    if ((array == null) || !_.isArray(array) || array.length < 0) { return }
    return array.forEach((user, index) => Activity.save(user))
  },

  save(user) {
    user.lastActive = user.timestamp
    if ((user == null) || typeof user !== 'object') { return }

    let prev = Periods.findOne({userID: user.userID}, {sort: {lastActive: -1}})
    // console.log 'prev', prev

    if (user.status === 'offline') {
      if ((prev == null) || prev.finished === true) return
      console.log("finished period:\t", moment(prev.firstActive).format('HH:mm:ss'), moment(user.lastActive).format('HH:mm:ss'), user.userID)
      let update = {
        updatedAt: Date.now(),
        lastActive: user.lastActive,
        finished: true
      }
      if (user.lastActive - prev.firstActive < 10000) {
        update.dot = true
      }
      return Periods.update(prev._id, {$set: update})
    } else {
      if ((prev == null) || prev.finished === true) {
        console.log("new period:\t", moment(user.lastActive).format('HH:mm:ss'), user.userID);
        return Periods.insert({
          userID: user.userID,
          firstActive: user.lastActive - 5000,
          lastActive: user.lastActive,
          createdAt: Date.now()
        })
      }
      console.log("updates period:\t", moment(prev.firstActive).format('HH:mm:ss'), moment(user.lastActive).format('HH:mm:ss'), user.userID)
      return Periods.update(prev._id, {
        $set: {
          lastActive: user.lastActive,
          updatedAt: Date.now()
        }
      })
    }
  }

}

export default Activity