const { app, Menu, BrowserWindow, shell, powerSaveBlocker } = require('electron')
const electrify = require('electrify')(__dirname)

powerSaveBlocker.start('prevent-app-suspension')

app.on('ready', function() {
  const template = [{
    label: 'Be My Friend',
    submenu: [
      {
        label: 'About This Program',
        click: () => shell.openExternal('https://valiafetisov.com/my-little-prism')
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: app.quit
      }
    ]
  }]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

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
