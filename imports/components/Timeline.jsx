import React from 'react'

const Timeline = React.createClass({

  scale(time) {
    return (-1) * (this.props.min - time) / (1000 * 60)
  },

  interval(each, index) {
    const from = this.scale(each.from)
    const height = this.scale(each.to) - from
    const y = from

    return <rect
      key={'index_' + index}
      width={this.barWidth}
      height={height}
      x={this.barWidth}
      y={y}
    />
  },

  user(each, index) {
    const transform = "translate(" + this.barWidth * index + ", 0)"

    return <g key={each.userID} className='user' transform={transform} >
      {each.data.map(this.interval)}
    </g>
  },

  render() {
    const data = this.props.rows
    const svgWidth = 2000
    const svgHeight = this.scale(this.props.max)
    this.barWidth = svgWidth / data.length
    const viewBox = '0 0' + ' ' + svgWidth + ' ' + svgHeight

    return <div className="Cylinder">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height={svgHeight + 'px'}
        viewBox={viewBox}
        preserveAspectRatio="none"
        style={{transform: 'rotateX(180deg)'}}
      >
        {data.map(this.user)}
      </svg>
    </div>
  }

})

export default Timeline
