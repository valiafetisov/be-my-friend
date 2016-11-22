import React from 'react'
import Login from '/imports/components/Login'

const RootLayout = React.createClass({

  getInitialState () {
    return {loggedIn: false}
  },

  onLogin () {
    this.setState({loggedIn: true})
  },

  render () {
    if (this.state.loggedIn !== true) {
      return <div className="LoginLayout">
        <Login onLogin={this.onLogin}/>
      </div>
    }

    return <div className="RootLayout">
      {this.props.content}
    </div>
  }

})

export default RootLayout
