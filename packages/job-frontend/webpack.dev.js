const { WebpackBuilder } = require('@fangcha/webpack')

const config = require('fc-config').GlobalAppConfig

module.exports = new WebpackBuilder()
  .useReact()
  .setDevMode(true)
  .setPort(config.Job.adminPort_frontend)
  .setEntry('./src/index.tsx')
  .setExtras({
    devServer: {
      proxy: {
        '/api': `http://localhost:${config.Job.adminPort}`,
      },
      client: {
        overlay: false,
      },
    },
  })
  .build()
