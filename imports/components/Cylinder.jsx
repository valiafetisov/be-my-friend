import React from 'react'
import { Meteor } from 'meteor/meteor'

const Cylinder = React.createClass({

  componentDidMount() {
    // console.log('Cylinder: this.props:', this.props)
  },


  componentWillUnmount() {

  },

  componentWillReceiveProps(nextProps) {

  },

  render() {
    return <div className="Cylinder">
      {this.props.rows.map(function(row, index){
        return <div key={row.userID}>
          {row.label + ':' + row.data.length}
        </div>
      })}
    </div>
  }

})

export default Cylinder
