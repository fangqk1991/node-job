import { IResqueObserver, RedisConfig } from '@fangcha/resque'
import { FCDatabase } from 'fc-sql'

export interface ResqueProtocol {
  redisConfig: RedisConfig
  queues: string[]
  moduleMapData: {
    [p: string]: any
  }
  observer?: IResqueObserver
  jobAppName?: string
  jobDatabase?: FCDatabase
}
