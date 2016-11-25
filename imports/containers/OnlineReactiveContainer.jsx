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
  const friends = Friends.find({}, {sort: {fullName: 1}}).fetch()
  const onlinePeriods = Periods.find({finished: {$ne: true}}, {sort: {createdAt: 1}}).fetch()

  if (loading === true) return {loading}

  return {
    loading,
    friends,
    periods: onlinePeriods
  }
}, OnlineSVG)

export default OnlineReactiveContainer
