import React from 'react'

const OnlineSVG = function(props) {
  if (!props.friends) return null

  const friends = props.friends
  const periods = props.periods
  const barWidth = 100 / friends.length

  let friendsIDs = {}
  friends.forEach(function(friend, index) {
    friendsIDs[friend.userID] = index
  })

  function getTransform(userID) {
    const index = friendsIDs[userID]
    return 'translate(' + (index * barWidth) + ', 0)'
  }

  function renderPeriod(period, index) {
    return React.createElement(OnlineSvgPeriod, {
      key: index,
      period,
      barWidth,
      transform: getTransform(period.userID)
    })
  }

  console.log('onlinePeriods', periods)

  return <svg
    className="OnlineSVG"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="50vh"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    {(periods === undefined)
      ? ''
      : periods.map(renderPeriod)
    }
    <line
      className="OnlineSVG__horison"
      strokeWidth={0.2}
      x1={0}
      x2={100}
      y1={100}
      y2={100}
    />
  </svg>
}

const OnlineSvgPeriod = React.createClass({

  render() {
    return <line
      strokeWidth={this.props.barWidth}
      x1={this.props.barWidth}
      x2={this.props.barWidth}
      y1={0}
      y2={100}
      transform={this.props.transform}
    />
  }

})

export default OnlineSVG
