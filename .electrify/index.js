const { app, BrowserWindow, powerSaveBlocker } = require('electron')
const { setMenu } = require('./setMenu.js')
const electrify = require('electrify')(__dirname)
const { join } = require('path')
const { format } = require('url')

// prevent suspending the app
powerSaveBlocker.start('prevent-app-suspension')

app.on('ready', function() {
  // electrify start
  electrify.start(function(meteor_root_url) {
    // creates a new electron window
    setTimeout(function() {

      const win = new BrowserWindow({
        title: 'Be My Friend',
        width: 1200, height: 600,
        center: true,
        backgroundColor: '#222',
        'node-integration': false // node integration must to be off
      })

      // show loading page
      // const loadingPage = format({
      //   protocol: 'file',
      //   slashes: true,
      //   pathname: join(__dirname, 'loading.html')
      // })
      // win.loadURL(loadingPage)

      // set application menu
      setMenu(win)

      // open up meteor root url
      win.loadURL(meteor_root_url)

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
