import { JobServer } from '@fangcha/job'
import { MyDatabase } from './MyDatabase'
import { JobConfig } from '../JobConfig'

export const MyJobServer = new JobServer({
  database: MyDatabase.jobDB,
  appName: 'Task',
  redisConfig: JobConfig.jobResque,
  // queues: ['NormalPriorityQueue', ...JobConfig.jobResque.dynamicQueues],
  // taskNames: Object.keys(TaskResqueTaskMapper),
})
