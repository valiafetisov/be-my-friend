import React from 'react'

const TimelineSVG = React.createClass({

  scale(time) {
    return (time - this.props.from) / 1000 / 30
  },

  renderPeriod(period, index) {
    const firstActive = this.scale(period.firstActive)
    const lastActive = this.scale(period.lastActive)
    const shift = this.barWidth * (this.props.friendsIDs[period.userID] + 1)
    // console.log('this.props.friendsIDs[period.userID]', this.props.friendsIDs[period.userID])
    return <line
      key={period._id}
      strokeWidth={this.barWidth}
      x1={shift}
      x2={shift}
      y1={firstActive}
      y2={lastActive}
    />
  },

  render() {
    if (this.props.friends === undefined) return null
    const svgWidth = 100
    const svgHeight = this.scale(this.props.to) - this.scale(this.props.from)
    const viewBox = '0 0' + ' ' + svgWidth + ' ' + svgHeight
    this.barWidth = svgWidth / this.props.friends.length

    return <svg
      className="TimelineSVG"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height={svgHeight + 'px'}
      viewBox={viewBox}
      preserveAspectRatio="none"
    >
      {this.props.periods.map(this.renderPeriod)}
    </svg>
  }

})

export default TimelineSVG
