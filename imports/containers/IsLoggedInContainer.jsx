import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import Credentials from '/imports/collections/Credentials'
import IsLoggedInLayout from '/imports/layouts/IsLoggedInLayout'

const IsLoggedInContainer = createContainer(() => {
  const subscription = Meteor.subscribe('credential')
  const loading = !subscription.ready()
  const latest = Credentials.findOne({}, {sort: {createdAt: -1}})
  return {
    loading,
    latest
  }
}, IsLoggedInLayout)

export default IsLoggedInContainer
