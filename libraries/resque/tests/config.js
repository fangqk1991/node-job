const config = {
  logFile: `${__dirname}/run.local/resque.log`,
  pidFile: `${__dirname}/run.local/resque.pid`,
  redisConfig: {
    redisHost: '127.0.0.1',
    redisPort: 6379,
  },
  moduleMapFile: `${__dirname}/task-map.js`,
  queues: ['TaskQueueDemo', 'TaskQueueDemo2'],
}

module.exports = config
