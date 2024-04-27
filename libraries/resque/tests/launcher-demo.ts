import { FCMaster } from '../src'
import * as modules from './task-map'

const master = new FCMaster({
  redisConfig: {
    redisHost: '127.0.0.1',
    redisPort: 6379,
  },
  queues: ['TaskQueueDemo', 'TaskQueueDemo2'],
  moduleMapData: modules,
})
master.run()
