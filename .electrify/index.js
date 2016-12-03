const { app, BrowserWindow, powerSaveBlocker } = require('electron')
const { setMenu } = require('./setMenu.js')
const electrify = require('electrify')(__dirname)

// prevent suspending the app
powerSaveBlocker.start('prevent-app-suspension')

app.on('ready', function() {
  // electrify start
  electrify.start(function(meteor_root_url) {
    // creates a new electron window
    const win = new BrowserWindow({
      title: 'Be My Friend',
      width: 1200, height: 600,
      center: true,
      show: false,
      backgroundColor: '#222',
      'node-integration': false // node integration must to be off
    })

    // set application menu
    setMenu(win)

    // open up meteor root url
    setTimeout(function() {
      win.loadURL(meteor_root_url)
      win.show()
    }, 10000)
  })
})

app.on('window-all-closed', function() {
  app.quit()
})

app.on('will-quit', function terminate_and_quit(event) {
  if (electrify.isup() && event) {
    event.preventDefault()
    electrify.stop(function() {
      app.quit()
    })
  }
})

//
// =============================================================================
//
// the methods bellow can be called seamlessly from your Meteor's
// client and server code, using:
//
//    Electrify.call('methodname', [..args..], callback)
//
// ATENTION:
//    From meteor, you can only call these methods after electrify is fully
//    started, use the Electrify.startup() convenience method for this
//
//
// Electrify.startup(function(){
//   Electrify.call(...)
// })
//
// =============================================================================
//
// electrify.methods({
//   'method.name': function(name, done) {
//     // do things... and call done(err, arg1, ..., argN)
//     done(null)
//   }
// })
//
