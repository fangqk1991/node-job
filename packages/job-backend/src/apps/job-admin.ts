import { JobConfig } from '../JobConfig'
import { GlobalAppConfig } from 'fc-config'
import { WebApp } from '@fangcha/backend-kit/lib/router'
import { SsoSdkPlugin } from '@fangcha/web-auth-sdk'
import { UserSdkPlugin } from '@fangcha/user-sdk'
import { MyDatabase } from '../services/MyDatabase'
import { JobWebPlugin } from '@fangcha/job-sdk/web-sdk'
import { CommonJob } from '../models/CommonJob'

const app = new WebApp({
  env: GlobalAppConfig.Env,
  tags: GlobalAppConfig.Tags,
  appName: 'job-admin',
  wecomBotKey: JobConfig.wecomBotKey,
  frontendConfig: JobConfig.adminFrontendConfig,
  routerOptions: {
    baseURL: JobConfig.adminBaseURL,
    backendPort: JobConfig.adminPort,
    jwtProtocol: {
      jwtKey: 'task_token_jwt',
      jwtSecret: JobConfig.adminJwtSecret,
    },
  },
  plugins: [
    SsoSdkPlugin({
      ssoAuth: JobConfig.adminSSO,
      jwtOptions: {
        jwtKey: 'task_token_jwt',
        jwtSecret: JobConfig.adminJwtSecret,
      },
    }),
    JobWebPlugin({
      CommonJob: CommonJob,
    }),
    UserSdkPlugin(JobConfig.userService),
  ],

  checkHealth: async () => {
    await MyDatabase.jobDB.ping()
  },
})
app.launch()
