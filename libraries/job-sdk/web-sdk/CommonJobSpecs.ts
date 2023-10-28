import { SpecFactory } from '@fangcha/router'
import { CommonJobApis } from '@fangcha/job-models'
import { _CommonJob } from '@fangcha/job'

const factory = new SpecFactory('Common Job')

factory.prepare(CommonJobApis.JobPageDataGet, async (ctx) => {
  const CommonJob = ctx.CommonJob as typeof _CommonJob
  ctx.body = await CommonJob.getPageResult(ctx.request.query)
})

export const CommonJobSpecs = factory.buildSpecs()
