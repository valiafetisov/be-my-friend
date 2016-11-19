import React from 'react'
import { Meteor } from 'meteor/meteor'
import Periods from '/lib/collections/Periods'
import Timeline from '/imports/components/Timeline'

const TimelineContainer = React.createClass({

  componentDidMount() {
    Meteor.call('getOneDayActivity', null, (err, res) => {
      if (err != null) return console.error('Timeline: getOneDayActivity: error:', err)
      this.setState({ res })
    })
  },

  render() {
    if (!this.state) return null
    return <Timeline {...this.state.res} />
  }

})

export default TimelineContainer
