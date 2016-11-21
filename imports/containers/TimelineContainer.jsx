import React from 'react'
import { Meteor } from 'meteor/meteor'
import Periods from '/lib/collections/Periods'
import Timeline from '/imports/components/Timeline'

const TimelineContainer = React.createClass({

  componentDidMount() {
    this.fetchData()
    this.interval = setInterval(this.fetchData, 10000)
  },

  componentWillUnmount() {
    clearInterval(this.interval)
  },

  fetchData() {
    Meteor.call('getOneDayActivity', null, (err, res) => {
      if (err != null) return console.error('TimelineContainer: getOneDayActivity: error:', err)
      this.setState({ res })
    })
  },

  render() {
    if (!this.state) return null
    return <Timeline {...this.state.res} />
  }

})

export default TimelineContainer
