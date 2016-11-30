import React from 'react'
import { Meteor } from 'meteor/meteor'

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
    Meteor.call('getActivityNormalized', this.props.from, this.props.to, (err, res) => {
      if (err != null) return console.error('TimelineContainer: getActivity: error:', err)
      this.setState({ res })
      if (this.props.transmitTimelineData) {
        this.props.transmitTimelineData({
          from: res.from,
          to: res.to
        })
      }
    })
  },

  render() {
    if (!this.state) return null
    if (!this.props.component) return null
    return React.createElement(this.props.component, {...this.props, ...this.state.res})
  }

})

export default TimelineContainer
