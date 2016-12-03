import fs from 'fs'
import { Meteor } from 'meteor/meteor'
import getAllData from '/server/lib/getAllData'

Meteor.methods({
  exportJSON(filepath) {
    console.log('exportJSON', filepath)
    const data = getAllData()
    const json = JSON.stringify(data, null, 2)
    fs.writeFile(filepath, json)
  }
})
