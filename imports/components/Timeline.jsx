import React from 'react'

const Timeline = React.createClass({

  scale(time) {
    return time / (1000 * 60)
  },

  renderPeriod(period, index) {
    const from = this.scale(period.from)
    const to = this.scale(period.to)

    return <line
      key={'index_' + index}
      x1={this.barWidth}
      x2={this.barWidth}
      y1={from}
      y2={to}
    />
  },

  renderFriend(friend, index) {
    const transform = "translate(" + this.barWidth * index + ", 0)"

    return <g key={friend.userID} transform={transform} >
      <line
        className='friend'
        x1={this.barWidth}
        x2={this.barWidth}
        y1={this.scale(this.props.min)}
        y2={this.scale(this.props.now)}
      />
      {friend.periods.map(this.renderPeriod)}
    </g>
  },

  render() {
    const friends = this.props.friends
    const svgWidth = 100
    const svgHeight = this.scale(this.props.now - this.props.min)
    const moveUp = (-1) * this.scale(this.props.min)
    const viewBox = '0 0' + ' ' + svgWidth + ' ' + svgHeight
    this.barWidth = svgWidth / friends.length

    return <div className="Timeline">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height={svgHeight + 'px'}
        viewBox={viewBox}
        preserveAspectRatio="none"
        style={{transform: 'rotateX(180deg)'}}
      >
        <g transform={'translate(0, ' + moveUp + ')'}>
          {friends.map(this.renderFriend)}
        </g>
      </svg>
    </div>
  }

})

export default Timeline
