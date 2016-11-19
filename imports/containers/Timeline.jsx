import React from 'react'
import { Meteor } from 'meteor/meteor'
import Periods from '/lib/collections/Periods'
import Cylinder from '/imports/components/Cylinder'

const Timeline = React.createClass({

  componentDidMount() {
    Meteor.call('getOneDayActivity', null, (err, res) => {
      if (err != null) return console.error('Timeline: getOneDayActivity: error:', err)
      // console.log('Timeline: getOneDayActivity: result:', res)
      this.setState({ res })
    })
  },

  render() {
    if (!this.state) return null
    return <Cylinder {...this.state.res} />
  }

})

export default Timeline
