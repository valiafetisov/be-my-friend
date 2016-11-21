import React from 'react'
import Timeline from '/imports/components/Timeline'

const TimelineLayout = React.createClass({

  render () {
    return <div className="TimelineLayout">
      <div className="info">{this.props.max}</div>
      <Timeline {...this.props} />
    </div>
  }

})

export default TimelineLayout
