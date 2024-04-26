import { SpecFactory } from '@fangcha/router'
import { CommonJobApis, JobParams } from '@fangcha/job-models'
import { JobServer } from '@fangcha/job'
import * as assert from '@fangcha/assert'
import { Resque, ResqueJob } from '@fangcha/resque'

const factory = new SpecFactory('Common Job')

factory.prepare(CommonJobApis.JobPageDataGet, async (ctx) => {
  const jobServer = ctx.jobServer as JobServer
  const CommonJob = jobServer.CommonJob
  ctx.body = await CommonJob.getPageResult(ctx.request.query)
})

factory.prepare(CommonJobApis.JobCreate, async (ctx) => {
  const jobServer = ctx.jobServer as JobServer
  const redisConfig = jobServer.options.redisConfig
  assert.ok(!!redisConfig, 'redisConfig missing.')
  Resque.setRedisBackend(redisConfig!)

  const params = ctx.request.body as JobParams

  const resqueJob = ResqueJob.generate(params.queue, params.taskName, params.params)
  await jobServer.CommonJob.saveResqueJobAndEnqueue(resqueJob)

  ctx.status = 200
})

export const CommonJobSpecs = factory.buildSpecs()
