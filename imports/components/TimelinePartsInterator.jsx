import React from 'react'
import TimelinePartContainer from '/imports/containers/TimelinePartContainer'
import TimelineSVG from '/imports/components/TimelineSVG'
import Const from '/imports/libs/Const'

const TimelinePartsInterator = React.createClass({

  render() {
    if (this.props.loading === true) return null

    // Calculate number of parts
    const diff = this.props.timelineStop - this.props.timelineStart
    const hours = Math.floor(diff / Const.millisecondsPerTimelinePart)

    // Create small timelines
    var blocks = []
    for (let i = hours; i >= 0; i--) {
      const partStart = this.props.timelineStart + Const.millisecondsPerTimelinePart * i
      let partStop = this.props.timelineStart + Const.millisecondsPerTimelinePart * (i + 1)
      if (partStop > this.props.timelineStop) partStop = null
      const interval = (i === hours) ? 1000 : null
      const transmitFunction = (i === hours) ? this.props.transmitTimelineData : null

      blocks.push(
        <TimelinePartContainer
          key={'container_' + i}
          partStop={partStop}
          partStart={partStart}
          interval={interval}
          component={TimelineSVG}
        />
      )
    }

    return <div>{blocks}</div>
  }

})

export default TimelinePartsInterator
