import { loginToFacebook } from '/server/lib/facebookSetup'

Meteor.startup(function() {
  try {
    loginToFacebook()
  } catch(e) {
    console.error('startup failed', e.reason)
  }
})
