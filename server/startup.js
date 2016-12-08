import { loginToFacebook } from '/server/lib/facebookSetup'
import removeOverlappingPeriods from '/server/lib/removeOverlappingPeriods'

Meteor.startup(function() {
  // temp fix
  removeOverlappingPeriods()

  try {
    loginToFacebook()
  } catch(e) {
    console.error('startup failed', e.reason)
  }
})
