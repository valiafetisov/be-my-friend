import React from 'react'

const TimelineDIV = React.createClass({

  scale(time) {
    return time / 1000 / 60
  },

  interval(each, index) {
    const style = {
      bottom: this.scale(each.from) + 'px',
      // bottom: (-1 * this.scale(each.from)) + 'px',
      height: this.scale(each.to - each.from) + 'px'
    }

    return <div
      key={'index_' + index}
      className='interval'
      style={style}
    />
  },

  user(each, index) {
    const style = {
      width: this.barWidth + '%',
      height: '100%',
      left: (this.barWidth * index) + '%'
    }

    return <div
      key={each.userID}
      className='user'
      style={style}
    >
      {each.data.map(this.interval)}
    </div>
  },

  render() {
    const data = this.props.rows
    const svgWidth = 100
    const svgHeight = this.scale(this.props.max - this.props.min)
    // const moveUp = (-1) * this.scale(this.props.min)
    this.barWidth = svgWidth / data.length
    const style = {
      width: '100%',
      height: svgHeight + 'px'
    }

    return <div className="TimelineDIV">
      <div
        className="svg"
        style={style}
      >
        <div className="wrapper" style={{height: this.scale(this.props.max) + 'px'}}>
          {data.map(this.user)}
        </div>
      </div>
    </div>
  }

})

export default TimelineDIV
