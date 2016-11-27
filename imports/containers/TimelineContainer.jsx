import React from 'react'
import { Meteor } from 'meteor/meteor'
import Periods from '/imports/collections/Periods'
import Timeline from '/imports/components/Timeline'

const TimelineContainer = React.createClass({

  componentDidMount() {
    this.fetchData()
    if (this.props.interval === undefined) return
    this.interval = setInterval(this.fetchData, this.props.interval)
  },

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval)
  },

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState
  },

  fetchData() {
    Meteor.call('getActivity', null, (err, res) => {
      if (err != null) return console.error('TimelineContainer: getActivity: error:', err)
      this.setState({ res })
      if (this.props.transmitTimelineData) {
        this.props.transmitTimelineData({
          min: res.min,
          now: res.now
        })
      }
    })
  },

  render() {
    if (!this.state) return null

    const component = (!this.props.component) ? Timeline : this.props.component

    return React.createElement(component, {...this.props, ...this.state.res})
  }

})

export default TimelineContainer
