import React from 'react'

const TimelineDIV = React.createClass({

  scale(time) {
    return time / 1000 / 60
  },

  renderPeriod(period, index) {
    const style = {
      bottom: this.scale(period.from) + 'px',
      height: this.scale(period.to - period.from) + 'px'
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
      {friend.periods.map(this.renderPeriod)}
    </div>
  },

  render() {
    const friends = this.props.friends
    const svgWidth = 100
    const svgHeight = this.scale(this.props.now - this.props.min)
    // const moveUp = (-1) * this.scale(this.props.min)
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
        <div className="wrapper" style={{height: this.scale(this.props.now) + 'px'}}>
          {friends.map(this.renderFriend)}
        </div>
      </div>
    </div>
  }

})

export default TimelineDIV
