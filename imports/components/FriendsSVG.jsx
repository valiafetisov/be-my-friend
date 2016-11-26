import React from 'react'

const FriendsSVG = function(props) {
  if (!props.friends) return null

  const friends = props.friends
  const barWidth = 100 / friends.length

  return <svg
    className="FriendsSVG"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    {friends.map((friend, index) => {
      const shiftLeft = barWidth * (index + 1)
      return <line
        key={friend.userID}
        className="friend"
        x1={shiftLeft}
        x2={shiftLeft}
        y1={0}
        y2={100}
        strokeWidth={barWidth}
        onMouseOver={(e) => { if (props.transmitFriendOnHover) return props.transmitFriendOnHover(e, friend) }}
      />
    })}
  </svg>
}

export default FriendsSVG
