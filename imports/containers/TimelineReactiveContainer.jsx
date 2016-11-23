import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import Periods from '/imports/collections/Periods'
import Friends from '/imports/collections/Friends'
import TimelineLayout from '/imports/layouts/TimelineLayout'

const TimelineReactiveContainer = createContainer(() => {
  const periodsSubscription = Meteor.subscribe('periods')
  const friendsSubscription = Meteor.subscribe('friends')
  const loading = !periodsSubscription.ready() || !friendsSubscription.ready()
  const periods = Periods.find({}, {sort: {createdAt: 1}}).fetch()
  const friends = Friends.find({}, {sort: {fullName: 1}}).fetch()

  if (loading === true) return {loading}

  return {
    loading,
    periods,
    friends,
    min: periods[0].firstActive,
    max: periods[periods.length - 1].lastActive,
    now: Date.now()
  }
}, TimelineLayout)

export default TimelineReactiveContainer
