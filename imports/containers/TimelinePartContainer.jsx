import React from 'react'
import { Meteor } from 'meteor/meteor'

const TimelinePartContainer = React.createClass({

  componentDidMount() {
    this.fetchData()
    if (this.props.interval == null) return
    this.interval = setInterval(this.fetchData, this.props.interval)
  },

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval)
  },

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState
  },

  fetchData() {
    Meteor.call('getActivityNormalized', this.props.partStart, this.props.partStop, (err, res) => {
      if (err != null) return console.error('TimelineContainer: getActivity: error:', err)
      this.setState({ res })
    })
  },

  render() {
    if (!this.state) return null
    if (!this.props.component) return null
    return React.createElement(this.props.component, {...this.props, ...this.state.res})
  }

})

export default TimelinePartContainer
