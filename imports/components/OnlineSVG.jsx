import React from 'react'

const OnlineSVG = function(props) {
  if (!props.friends) return null

  const friends = props.friends
  const barWidth = 100 / friends.length

  return <svg
    className="OnlineSVG"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="50vh"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    {friends.map((friend, index) => {
      return <OnlineSvgPeriod
        key={index}
        index={index}
        online={friend.online}
        barWidth={barWidth}
      />
    })}
  </svg>
}

const OnlineSvgPeriod = React.createClass({

  getInitialState () {
    return {ready: false}
  },

  componentDidMount () {
    this.setState({ready: true})
  },

  render() {
    const shiftLeft = this.props.barWidth * (this.props.index + 1)
    const shiftTop = (!this.props.online) ? -100 : 0
    const style = (!this.state.ready) ? {} : {transform: 'translateY(' + shiftTop + '%)'}

    return <g>
      <line
        className="OnlineSVG__online"
        strokeWidth={this.props.barWidth}
        x1={shiftLeft}
        x2={shiftLeft}
        y1={0}
        y2={100}
        style={style}
      />
      <line
        className="OnlineSVG__process"
        strokeWidth={this.props.barWidth}
        x1={shiftLeft}
        x2={shiftLeft}
        y1={0}
        y2={100}
        style={style}
      />
    </g>
  }

})

export default OnlineSVG
