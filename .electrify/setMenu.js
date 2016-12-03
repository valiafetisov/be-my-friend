const { app, Menu, shell, dialog } = require('electron')
const moment = require('moment')

const setMenu = function(win) {
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
        label: 'Export JSON...',
        click: function() {
          dialog.showSaveDialog({
            title: 'Save as',
            defaultPath: '~/Downloads/backup_' + moment().format('YYYY-MM-DD_HH-mm') + '.json'
          }, function(filepath) {
            if (filepath === undefined) return
            console.log('Export JSON: filepath', filepath)
            win.webContents.executeJavaScript('Meteor.call("exportJSON", "' + filepath + '")')
          })
        }
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
}

module.exports = { setMenu }
