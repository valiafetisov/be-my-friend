import React from 'react'

function scale(time) {
  return time / 1000 / 60
}

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


  return <div className="TimelineDIV">
    <div className="svg" style={style}>
      <div className="wrapper" style={{height: scale(props.now) + 'px'}}>
        {friends.map((friend, index) => renderFriend(friend, index, periods, props.showInfo, props.now))}
      </div>
    </div>
  </div>
}

function renderFriend(friend, index, periods, showInfo, now) {
  const style = {
    height: '100%',
    left: (barWidth * index) + '%'
  }

  return <div
    key={friend.userID}
    className='friend'
    style={style}
    onMouseOver={(e) => showInfo(e, friend)}
    title={friend.fullName}
  >
    {periods.map((period, index) => renderPeriod(period, index, friend, now))}
  </div>
}

function renderPeriod(period, index, friend, now) {
  if (friend.userID !== period.userID) return

  const lastActive = (period.finished !== true || period.lastActive == null)
    ? now
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

export default TimelineReactiveDIV
