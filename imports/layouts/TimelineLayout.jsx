import React from 'react'
import moment from 'moment'
import TimelineContainer from '/imports/containers/TimelineContainer'

const TimelineLayout = React.createClass({

  getInitialState() {
    return {
      name: '',
      timepoint: '',
      offsetY: '',
      style: {
        display: 'none'
      }
    }
  },

  formatData(timestamp) {
    return (timestamp)
      ? moment(timestamp).format('DD.MM HH:mm:ss')
      : ''
  },

  transmitTimelineData({min, now}) {
    const timestamp = this.state.offsetY * 1000 * 30 + min
    this.setState({
      timepoint: this.formatData(timestamp),
      now
    })
  },

  transmitFriendOnHover(e, friend) {
    this.setState({
      name: friend.fullName
    })
  },

  onMouseMove(e) {
    this.setState({
      offsetY: e.nativeEvent.offsetY,
      style: {
        display: 'inline-block',
        top: e.nativeEvent.clientY,
        left: e.nativeEvent.clientX
      }
    })
  },

  render() {
    return <div className="TimelineLayout" onMouseMove={this.onMouseMove}>
      <div className="TimelineLayout__info" style={this.state.style}>
        {this.state.timepoint} <br />
        {this.state.name}
      </div>
      <div className="TimelineLayout__statusBar">{'Last time updated: ' + this.formatData(this.state.now)}</div>
      <TimelineContainer
        transmitFriendOnHover={this.transmitFriendOnHover}
        transmitTimelineData={this.transmitTimelineData}
      />
    </div>
  }

})

export default TimelineLayout
