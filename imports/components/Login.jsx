import React from 'react'
import { Meteor } from 'meteor/meteor'

const Login = React.createClass({

  getInitialState () {
    return {
      error: '',
      loading: false
    }
  },

  componentDidMount () {
    this.setState({ready: true})
  },

  setError (error) {
    if (error == null) return

    this.setState({error: error})

    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => this.setState({error: ''}), 2000)
  },

  handleSubmit (event) {
    event.preventDefault()

    if (
      this.state == null ||
      this.state.login == null ||
      this.state.login == '' ||
      this.state.password == null ||
      this.state.password == ''
    ) {
      return this.setError('Please enter your login and password')
    }
    if (this.state.agree !== true) {
      return this.setError('Please agree with terms of use')
    }

    this.setState({loading: true})
    Meteor.call('loginToFacebook', this.state, (error, result) => {
      this.setState({loading: false})
      if (error) return this.setError(error.reason)
    })
  },

  render () {
    const loginReadyStyle = (this.state.ready) ? {transform: 'translateY(0)'} : {}
    const loadingStyle = (this.state.loading) ? {display: 'inline-block'} : {}

    return <form className="Login" onSubmit={this.handleSubmit} style={loginReadyStyle}>
      <div className="Login__title">Please login</div>
      <div className="Login__subtitle">Use you Facebook account credentials</div>
      <div className="Login__error">{this.state.error}</div>
      <label className="Login__login">
        <div>Login</div>
        <input type="text" autoFocus onChange={(e) => this.setState({login: e.target.value})} />
      </label>
      <label className="Login__password">
        <div>Password</div>
        <input type="password" onChange={(e) => this.setState({password: e.target.value})} />
      </label>
      <label className="Login__agree">
        <input type="checkbox" onChange={(e) => this.setState({agree: e.target.checked})} />
        <div>I realize that this program may violate Facebook terms of service. I wish to proceed on my own risk</div>
      </label>
      <label className="Login__submit">
        <input disabled={this.state.loading} type="submit" value="Log In" />
        <img style={loadingStyle} src="/images/loading-circle.svg" />
      </label>
    </form>
  }

})

export default Login
