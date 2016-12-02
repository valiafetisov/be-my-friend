import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import Periods from '/imports/collections/Periods'
import TimelinePartsInterator from '/imports/components/TimelinePartsInterator'

const TimelinePartsContainer = createContainer((props) => {
  const periodsSubscription = Meteor.subscribe('periods/first')
  const loading = !periodsSubscription.ready()
  const period = Periods.findOne({firstActive: {$ne: NaN}}, {
    sort: {firstActive: 1},
    limit: 1,
    fields: {firstActive: 1}
  })

  if (loading) return { loading }

  return {
    ...this.props,
    loading,
    timelineStart: period.firstActive,
    timelineStop: props.timelineStop || null
  }
}, TimelinePartsInterator)

export default TimelinePartsContainer
