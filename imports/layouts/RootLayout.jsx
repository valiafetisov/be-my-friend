import React from 'react'

const RootLayout = React.createClass({

  render () {
    return <div className="container">
      {this.props.content}
    </div>
  }

})

export default RootLayout