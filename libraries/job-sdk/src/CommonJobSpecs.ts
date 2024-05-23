import { SpecFactory } from '@fangcha/router'
import { CommonJobApis, JobCenterOptions, JobParams } from '@fangcha/job-models'
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
  params.params = params.params || {}

  assert.ok(!!params.queue, 'queue missing.')
  assert.ok(!!params.taskName, 'taskName missing.')

  const resqueJob = ResqueJob.generate(params.queue, params.taskName, params.params)
  await jobServer.CommonJob.saveResqueJobAndEnqueue(resqueJob)

  ctx.status = 200
})

factory.prepare(CommonJobApis.JobCenterMetadataGet, async (ctx) => {
  const jobServer = ctx.jobServer as JobServer
  const CommonJob = jobServer.CommonJob

  const options: JobCenterOptions = {
    queues: jobServer.options.queues || [],
    taskNames: jobServer.options.taskNames || [],
  }
  if (options.queues.length === 0) {
    const searcher = new CommonJob().fc_searcher()
    searcher.processor().setColumns(['queue'])
    searcher.processor().markDistinct()
    searcher.processor().removeAllOrderRules()
    const items = await searcher.queryAllFeeds()
    options.queues = items.map((item) => item.queue)
  }
  if (options.taskNames.length === 0) {
    const searcher = new CommonJob().fc_searcher()
    searcher.processor().setColumns(['task_name'])
    searcher.processor().markDistinct()
    searcher.processor().removeAllOrderRules()
    const items = await searcher.queryAllFeeds()
    options.taskNames = items.map((item) => item.taskName)
  }
  ctx.body = options
})

export const CommonJobSpecs = factory.buildSpecs()
