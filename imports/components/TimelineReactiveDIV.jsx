import React from 'react'

const TimelineReactiveDIV = function(props) {
  if (props.loading === true) return null

  const friends = props.friends
  const periods = props.periods
  const svgWidth = 100
  const svgHeight = scale(props.now - props.min)
  barWidth = svgWidth / friends.length
  const style = {
    width: '100%',
    height: svgHeight + 'px'
  }

  function scale(time) {
    return time / 1000 / 60
  }

  function renderPeriod(period, index, userID) {
    if (userID !== period.userID) return

    const lastActive = (period.finished !== true || period.lastActive == null)
      ? props.now
      : period.lastActive
    const firstActiveScaled = scale(period.firstActive)
    const style = {
      bottom: firstActiveScaled + 'px',
      height: scale(lastActive) - firstActiveScaled + 'px'
    }

    return <div
      key={'index_' + index}
      className='period'
      style={style}
    />
  }

  function renderFriend(friend, index) {
    const style = {
      height: '100%',
      left: (barWidth * index) + '%'
    }

    return <div
      key={friend.userID}
      className='friend'
      style={style}
    >
      {props.periods.map((period, index) => renderPeriod(period, index, friend.userID))}
    </div>
  }

  return <div className="TimelineDIV">
    <div className="svg" style={style}>
      <div className="wrapper" style={{height: scale(props.now) + 'px'}}>
        {friends.map(renderFriend)}
      </div>
    </div>
  </div>
}

export default TimelineReactiveDIV
