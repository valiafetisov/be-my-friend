import React from 'react'

const TimelineReactiveDIV = React.createClass({

  scale(time) {
    return time / 1000 / 60
  },

  renderPeriod(period, index, userID) {
    if (userID !== period.userID) return

    const lastActive = (period.finished !== true || period.lastActive == null)
      ? Date.now()
      : period.lastActive
    const firstActiveScaled = this.scale(period.firstActive)
    const style = {
      bottom: firstActiveScaled + 'px',
      height: this.scale(lastActive) - firstActiveScaled + 'px'
    }

    return <div
      key={'index_' + index}
      className='period'
      style={style}
    />
  },

  renderFriend(friend, index) {
    const style = {
      width: this.barWidth + '%',
      height: '100%',
      left: (this.barWidth * index) + '%'
    }

    return <div
      key={friend.userID}
      className='friend'
      style={style}
    >
      {this.props.periods.map((period, index) => this.renderPeriod(period, index, friend.userID))}
    </div>
  },

  render() {
    if (this.props.loading === true) return null
    const now = Date.now()
    const friends = this.props.friends
    const periods = this.props.periods
    const svgWidth = 100
    const svgHeight = this.scale(now - periods[0].firstActive)
    this.barWidth = svgWidth / friends.length
    const style = {
      width: '100%',
      height: svgHeight + 'px'
    }

    return <div className="TimelineDIV">
      <div
        className="svg"
        style={style}
      >
        <div className="wrapper" style={{height: this.scale(now) + 'px'}}>
          {friends.map(this.renderFriend)}
        </div>
      </div>
    </div>
  }

})

export default TimelineReactiveDIV
