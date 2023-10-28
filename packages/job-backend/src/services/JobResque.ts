import { Resque, ResqueJob } from '@fangcha/resque'
import { JobConfig } from '../JobConfig'
import { CommonJob } from '../models/CommonJob'

Resque.setRedisBackend(JobConfig.jobResque)

export class JobResque {
  public static redis() {
    return Resque.redis()
  }

  public static async enqueue_SomeTask() {
    const resqueJob = ResqueJob.generate('NormalPriorityQueue', 'SomeTask')
    return CommonJob.saveResqueJobAndEnqueue(resqueJob)
  }
}
