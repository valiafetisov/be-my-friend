import React from 'react'
import TimelineLayout from '/imports/layouts/TimelineLayout'
import Login from '/imports/components/Login'

const IsLoggedInLayout = function(props) {
  if (props.loading) return <div>loading</div>

  return (props.latest)
    ? <TimelineLayout />
    : <Login />
}

export default IsLoggedInLayout
