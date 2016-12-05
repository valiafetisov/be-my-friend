import React from 'react'
import TimelinePartsLayout from '/imports/layouts/TimelinePartsLayout'
import OnlineReactiveContainer from '/imports/containers/OnlineReactiveContainer'
import Utils from '/imports/libs/Utils'
import Const from '/imports/libs/Const'

const TimelineLayout = React.createClass({

  getInitialState() {
    return {
      infoClassName: '',
      fullName: '',
      timepoint: '',
      infoStyle: {}
    }
  },

  receiveTimelineLimits({timelineStop, timelineStart}) {
    if (timelineStop) this.setState({timelineStop})
  },

  receiveFriendOnHover(e, friend) {
    this.setState({
      fullName: friend.fullName
    })
  },

  onMouseMove(e) {
    const offsetY = e.nativeEvent.offsetY || -1000
    const clientY = e.nativeEvent.clientY || -1000
    const clientX = e.nativeEvent.clientX || -1000

    // calculate time at cursor
    const timepoint = this.state.timelineStop - offsetY * Const.millisecondsPerPixel

    // adjust position of the info box
    let infoClassName = (clientX > window.innerWidth - 120) ? ' left' : ''
    infoClassName += (clientY < 35) ? ' bottom' : ''

    this.setState({
      infoClassName,
      timepoint: Utils.formatData(timepoint),
      infoStyle: {
        top: clientY,
        left: clientX
      }
    })
  },

  render() {
    const timelineStopFormatted = (!this.state.timelineStop) ? '' : 'Last time updated: ' + Utils.formatData(this.state.timelineStop)

    return <div className="TimelineLayout" onMouseMove={this.onMouseMove} onMouseLeave={this.onMouseLeave}>
      <div
        className={'TimelineLayout__info' + this.state.infoClassName}
        style={this.state.infoStyle}
      >
        <div className="TimelineLayout__oneLine">{this.state.timepoint}</div>
        <div className="TimelineLayout__oneLine">{this.state.fullName}</div>
      </div>
      <div className="TimelineLayout__emptyMessage">Please leave this window open, and return back in few hours</div>
      <div className="TimelineLayout__statusBar">{timelineStopFormatted}</div>
      <div className="TimelineLayout__svgs">
        <OnlineReactiveContainer
          transmitFriendOnHover={this.receiveFriendOnHover}
        />
        <TimelinePartsLayout
          transmitTimelineLimits={this.receiveTimelineLimits}
        />
      </div>
    </div>
  }

})

export default TimelineLayout
