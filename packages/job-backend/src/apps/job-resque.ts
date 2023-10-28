import { FangchaApp } from '@fangcha/backend-kit'
import { GlobalAppConfig } from 'fc-config'
import { JobConfig } from '../JobConfig'
import { TaskResqueTaskMapper } from './resque'
import { CommonJob } from '../models/CommonJob'
import { ResqueObserverHelper, ResqueSdkPlugin } from '@fangcha/resque-sdk'

const app = new FangchaApp({
  env: GlobalAppConfig.Env,
  tags: GlobalAppConfig.Tags,
  appName: 'job-resque',
  wecomBotKey: JobConfig.wecomBotKey,
  plugins: [
    ResqueSdkPlugin({
      redisConfig: JobConfig.jobResque,
      queues: ['HighPriorityQueue', 'NormalPriorityQueue', 'LowPriorityQueue', ...JobConfig.jobResque.dynamicQueues],
      moduleMapData: TaskResqueTaskMapper,
      observer: ResqueObserverHelper.makeTypicalObserver(CommonJob),
    }),
  ],
})
app.launch()
