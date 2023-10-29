import { FCDatabase } from 'fc-sql'
import { _CommonJob } from './models/_CommonJob'

interface Options {
  database: FCDatabase
  appName?: string
}

export class JobServer {
  public readonly options: Options
  public readonly database: FCDatabase
  public readonly CommonJob!: { new (): _CommonJob } & typeof _CommonJob

  constructor(options: Options) {
    this.options = options

    this.database = options.database

    class CommonJob extends _CommonJob {}
    CommonJob.setDatabase(options.database)
    if (options.appName) {
      CommonJob.AppName = options.appName
    }
    this.CommonJob = CommonJob
  }
}
