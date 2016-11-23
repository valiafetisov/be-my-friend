import React from 'react'
import moment from 'moment'
import Timeline from '/imports/components/Timeline'
import TimelineDIV from '/imports/components/TimelineDIV'

const TimelineLayout = React.createClass({

  render () {
    const lastTime = moment(this.props.now).format('DD.MM.YYYY HH:ss')
    return <div className="TimelineLayout">
      <div className="info">{'Last time updated: ' + lastTime}</div>
      <TimelineDIV {...this.props} />
    </div>
  }

})

export default TimelineLayout
