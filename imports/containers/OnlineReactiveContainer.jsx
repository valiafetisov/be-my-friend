import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import Periods from '/imports/collections/Periods'
import Friends from '/imports/collections/Friends'
import OnlineSVG from '/imports/components/OnlineSVG'

const OnlineReactiveContainer = createContainer(() => {
  const friendsSubscription = Meteor.subscribe('friends')
  const periodsSubscription = Meteor.subscribe('periods/online')
  const loading = !periodsSubscription.ready() || !friendsSubscription.ready()
  const friends = Friends.find({}, {sort: {fullName: 1}, fields: {fullName: 1, userID: 1}}).fetch()
  let periods = Periods.find({finished: {$ne: true}}, {sort: {createdAt: 1}, fields: {userID: 1}}).fetch()

  // if (Meteor.isServer) periods = []
  // console.log('periods', periods)

  if (loading === true) return {loading}

  const onlineIDs = periods.reduce((ids, period) => {
    ids[period.userID] = true
    return ids
  }, {})
  friends.map((friend, index) => {
    friend.online = onlineIDs[friend.userID]
    return friend
  })

  return {
    loading,
    friends
  }
}, OnlineSVG)

export default OnlineReactiveContainer
