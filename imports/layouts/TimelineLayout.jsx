import React from 'react'
import Timeline from '/imports/components/Timeline'
import TimelineDIV from '/imports/components/TimelineDIV'

const TimelineLayout = React.createClass({

  render () {
    return <div className="TimelineLayout">
      <div className="info">{this.props.max}</div>
      <TimelineDIV {...this.props} />
    </div>
  }

})

export default TimelineLayout
