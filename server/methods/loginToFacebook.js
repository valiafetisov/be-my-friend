import facebook from 'facebook-chat-api'
import { Meteor } from 'meteor/meteor'
import Credentials from '/imports/collections/Credentials'
import { onFacebookLogin } from '/server/lib/facebookSetup'

Meteor.methods({
  loginToFacebook(credentials) {
    if (
      credentials == null ||
      credentials.login == null ||
      credentials.login == '' ||
      credentials.password == null ||
      credentials.password == ''
    ) {
      throw new Meteor.Error(403, 'Please enter your login and password')
    }
    if (credentials.agree !== true) {
      throw new Meteor.Error(403, 'Please agree with terms of use')
    }

    try {
      (Meteor.wrapAsync(loginWithPassword))(credentials)
    } catch(e) {
      throw new Meteor.Error(403, 'Wrong login / password')
    }

    return
  }
})

const loginWithPassword = function(credentials, callback) {
  facebook({
    email: credentials.login,
    password: credentials.password
  }, Meteor.bindEnvironment(function(error, api){
    if (error) {
      return callback(error, api)
    }

    Credentials.insert({
      login: credentials.login,
      password: credentials.password,
      userID: api.getCurrentUserID(),
      createdAt: Date.now()
    })

    // setup observers
    onFacebookLogin(error, api)
    return callback()
  }))
}
