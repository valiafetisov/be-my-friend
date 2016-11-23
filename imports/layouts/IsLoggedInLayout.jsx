import React from 'react'
import TimelineContainer from '/imports/containers/TimelineContainer'
import Login from '/imports/components/Login'

const IsLoggedInLayout = function(props) {
  if (props.loading) return <div>loading</div>

  return <div className="IsLoggedInLayout">
    {
      (props.latest)
      ? <TimelineContainer />
      : <Login />
    }
  </div>
}

export default IsLoggedInLayout
