import React from 'react'

const Timeline = React.createClass({

  scale(time) {
    return time / (1000 * 60)
  },

  interval(each, index) {
    const from = this.scale(each.from)
    const height = this.scale(each.to) - from

    return <rect
      key={'index_' + index}
      width={this.barWidth}
      x={this.barWidth}
      y={from}
      height={height}
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
    const svgWidth = 100
    const svgHeight = this.scale(this.props.max - this.props.min)
    const moveUp = (-1) * this.scale(this.props.min)
    const viewBox = '0 0' + ' ' + svgWidth + ' ' + svgHeight
    this.barWidth = svgWidth / data.length

    return <div className="Cylinder">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height={svgHeight + 'px'}
        viewBox={viewBox}
        preserveAspectRatio="none"
        style={{transform: 'rotateX(180deg)'}}
      >
        <g transform={'translate(0, ' + moveUp + ')'}>
          {data.map(this.user)}
        </g>
      </svg>
    </div>
  }

})

export default Timeline
