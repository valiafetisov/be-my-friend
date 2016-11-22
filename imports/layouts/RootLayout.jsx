import React from 'react'
import Login from '/imports/components/Login'
import Logins from '/lib/collections/Logins'

const RootLayout = React.createClass({

  render () {
    let latest = Logins.findOne({login: {$exists: true}}, {sort: {createdAt: -1}})
    if (latest == null) {
      return <div className="LoginLayout">
        <Login />
      </div>
    }

    return <div className="RootLayout">
      {this.props.content}
    </div>
  }

})

export default RootLayout
