import React from 'react'
import TimelinePartContainer from '/imports/containers/TimelinePartContainer'
import TimelineSVG from '/imports/components/TimelineSVG'

const TimelinePartsInterator = React.createClass({

  render() {
    if (this.props.loading === true) return null

    // Calculate number of parts
    const HOUR = 60 * 60 * 1000
    const diff = this.props.timelineStop - this.props.timelineStart
    const hours = Math.floor(diff / HOUR)

    // Create small timelines
    var blocks = []
    for (let i = hours; i >= 0; i--) {
      const partStart = this.props.timelineStart + HOUR * i
      let partStop = this.props.timelineStart + HOUR * (i + 1)
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
