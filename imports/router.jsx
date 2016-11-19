import React from 'react'
import { mount } from 'react-mounter'
import { FlowRouter } from 'meteor/kadira:flow-router-ssr'
import Timeline from '/imports/containers/Timeline'
import RootLayout from '/imports/layouts/RootLayout'

FlowRouter.route('/', {
  name: 'MainPage',
  action: (params, query) => {
    mount(RootLayout, {
      routename: FlowRouter.getRouteName(),
      content: <Timeline pathname={FlowRouter.getParam('path')} />
    })
  }
})
