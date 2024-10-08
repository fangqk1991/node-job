import { FCDatabase } from 'fc-sql'
import { _CommonJob } from './models/_CommonJob'
import { RedisConfig } from '@fangcha/resque'
import { JobCenterOptions } from '@fangcha/job-models'

interface Options extends Partial<JobCenterOptions> {
  database: FCDatabase

  // Default: common_job
  tableName_CommonJob?: string

  appName?: string

  redisConfig?: RedisConfig
}

export class JobServer {
  public readonly options: Options
  public readonly database: FCDatabase

  public readonly CommonJob!: { new (): _CommonJob } & typeof _CommonJob

  private readonly tableName_CommonJob: string

  constructor(options: Options) {
    this.options = options

    this.database = options.database

    this.tableName_CommonJob = options.tableName_CommonJob || 'common_job'

    class CommonJob extends _CommonJob {}
    CommonJob.addStaticOptions({
      database: options.database,
      table: this.tableName_CommonJob,
    })
    if (options.appName) {
      CommonJob.AppName = options.appName
    }
    this.CommonJob = CommonJob
  }
}
