import React from 'react'

const Login = React.createClass({

  setError (error) {
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
      return this.setError('Please agree with our terms')
    }
    console.log('Login: handleSubmit:', this.state)
  },

  render () {
    const error = (this.state) ? this.state.error : ''

    return <form className="Login" onSubmit={this.handleSubmit}>
      <div className="Login__title">Please login</div>
      <div className="Login__subtitle">Use you Facebook account credentials</div>
      <div className="Login__error">{error}</div>
      <label className="Login__login">
        <div>Login</div>
        <input type="text" onChange={(e) => this.setState({login: e.target.value})} />
      </label>
      <label className="Login__password">
        <div>Password</div>
        <input type="password" onChange={(e) => this.setState({password: e.target.value})} />
      </label>
      <label className="Login__agree">
        <input type="checkbox" onChange={(e) => this.setState({agree: e.target.checked})} />
        <div>I agree with terms of service</div>
      </label>
      <label className="Login__submit">
        <input type="submit" value="Login" />
      </label>
    </form>
  }

})

export default Login
