import React from 'react'
import { Meteor } from 'meteor/meteor'
import Periods from '/lib/collections/Periods'
import TimelineLayout from '/imports/layouts/TimelineLayout'

const TimelineContainer = React.createClass({

  componentDidMount() {
    this.fetchData()
    this.interval = setInterval(this.fetchData, 1000)
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
    return <TimelineLayout {...this.state.res} />
  }

})

export default TimelineContainer
