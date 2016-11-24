import React from 'react'
import moment from 'moment'
import Timeline from '/imports/components/Timeline'
import TimelineDIV from '/imports/components/TimelineDIV'
import TimelineReactiveDIV from '/imports/components/TimelineReactiveDIV'

const TimelineLayout = function(props) {
  const lastTime = moment(props.now).format('DD.MM.YYYY HH:mm:ss')

  return <div className="TimelineLayout">
    <div className="info">{'Last time updated: ' + lastTime}</div>
    <TimelineDIV {...props} />
  </div>
}

export default TimelineLayout
