import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import Periods from '/imports/collections/Periods'
import Friends from '/imports/collections/Friends'
import TimelineReactiveDIV from '/imports/components/TimelineReactiveDIV'

const TimelineReactiveContainer = createContainer(() => {
  const periodsSubscription = Meteor.subscribe('periods')
  const friendsSubscription = Meteor.subscribe('friends')
  const loading = !periodsSubscription.ready() || !friendsSubscription.ready()
  const periods = Periods.find({}, {sort: {createdAt: 1}}).fetch()
  const friends = Friends.find({}, {sort: {fullName: 1}}).fetch()

  return {
    loading,
    periods,
    friends
  }
}, TimelineReactiveDIV)

export default TimelineReactiveContainer
