import { JobServer } from '@fangcha/job'
import { MyDatabase } from './MyDatabase'
import { JobConfig } from '../JobConfig'

export const MyJobServer = new JobServer({
  database: MyDatabase.jobDB,
  appName: 'Task',
  redisConfig: JobConfig.jobResque,
})
