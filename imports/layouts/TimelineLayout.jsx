import React from 'react'
import moment from 'moment'
import TimelineContainer from '/imports/containers/TimelineContainer'
import OnlineReactiveContainer from '/imports/containers/OnlineReactiveContainer'
import TimelineSVG from '/imports/components/TimelineSVG'
import FriendsSVG from '/imports/components/FriendsSVG'

const TimelineLayout = React.createClass({

  getInitialState() {
    return {
      className: '',
      name: '',
      timepoint: '',
      style: {
        display: 'none'
      }
    }
  },

  formatData(timestamp) {
    return (timestamp)
      ? moment(timestamp).format('DD MMM HH:mm:ss')
      : ''
  },

  transmitTimelineData({min, now}) {
    this.setState({now})
  },

  transmitFriendOnHover(e, friend) {
    this.setState({
      name: friend.fullName
    })
  },

  onMouseMove(e) {
    const offsetY = e.nativeEvent.offsetY || -1000
    const clientY = e.nativeEvent.clientY || -1000
    const clientX = e.nativeEvent.clientX || -1000
    const now = this.state.now || Date.now()

    // calculate time at cursor
    const timepoint = now - offsetY * 1000 * 30

    // adjust position of the info box
    let className = (clientX > window.innerWidth - 120) ? ' left' : ''
    className += (clientY < 35) ? ' bottom' : ''

    this.setState({
      className,
      timepoint: this.formatData(timepoint),
      style: {
        display: 'inline-block',
        top: clientY,
        left: clientX
      }
    })
  },

  onMouseLeave() {
    this.setState({style: {display: '', top: -1000, left: -1000}})
  },

  render() {
    const lastTimeUpdated = (!this.state.now) ? '' : 'Last time updated: ' + this.formatData(this.state.now)

    return <div className="TimelineLayout" onMouseMove={this.onMouseMove} onMouseLeave={this.onMouseLeave}>
      <div
        className={'TimelineLayout__info' + this.state.className}
        style={this.state.style}
      >
        <div className="TimelineLayout__oneLine">{this.state.timepoint}</div>
        <div className="TimelineLayout__oneLine">{this.state.name}</div>
      </div>
      <div className="TimelineLayout__emptyMessage">Please leave this window open, and return back in a few hours</div>
      <div className="TimelineLayout__statusBar">{lastTimeUpdated}</div>
      <div className="TimelineLayout__svgs">
        <OnlineReactiveContainer
          transmitFriendOnHover={this.transmitFriendOnHover}
        />
        <TimelineContainer
          transmitTimelineData={this.transmitTimelineData}
          component={TimelineSVG}
          interval={10000}
        />
      </div>
    </div>
  }

})

export default TimelineLayout
