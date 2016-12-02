import React from 'react'
import TimelinePartsContainer from '/imports/containers/TimelinePartsContainer'

const TimelinePartsLayout = React.createClass({

  getInitialState() {
    return {
      globalTo: Date.now()
    }
  },

  componentDidMount() {
    setInterval(this.updateTimelineStop, 1000)
  },

  updateTimelineStop() {
    const timelineStop = Date.now()
    this.setState({timelineStop})
    if (this.props.transmitTimelineLimits) this.props.transmitTimelineLimits({timelineStop})
  },

  render() {
    return React.createElement(TimelinePartsContainer, {
      ...this.props,
      timelineStop: this.state.timelineStop
    })
  }

})

export default TimelinePartsLayout
