import { loginToFacebook } from '/server/lib/facebookSetup'

Meteor.startup(function() {
  // if (process.env.NODE_ENV === 'development') return
  loginToFacebook()
})
