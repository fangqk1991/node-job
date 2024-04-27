import React from 'react'
import { LaunchContainer } from '@fangcha/auth-react'
import { ReactApp } from '@fangcha/react'
import { MyMenu } from './core/MyMenu'
import { MainLayout } from './core/MainLayout'
import { HomeView } from './core/HomeView'
import { TaskPages } from '@web/job-common/admin-api'
import { JobListView } from '@fangcha/job-react'

new ReactApp({
  mainLayout: (
    <LaunchContainer>
      <MainLayout menu={MyMenu} />
    </LaunchContainer>
  ),
  routes: [
    {
      path: '/',
      element: <HomeView />,
    },
    {
      path: TaskPages.JobListRoute,
      element: <JobListView />,
    },
  ],
}).launch()
