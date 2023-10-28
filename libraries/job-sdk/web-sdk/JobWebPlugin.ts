import { AppPluginProtocol } from '@fangcha/backend-kit'
import { _RouterState } from '@fangcha/backend-kit/lib/router'
import { CommonJobSpecs } from './CommonJobSpecs'
import { _CommonJob } from '@fangcha/job'

export interface JobWebOptions {
  CommonJob: typeof _CommonJob & { new (): _CommonJob }
}

export const JobWebPlugin = (options: JobWebOptions): AppPluginProtocol => {
  return {
    appWillLoad: () => {
      const routerApp = _RouterState.routerApp
      routerApp.addDocItem({
        name: 'Job SDK',
        pageURL: '/api-docs/v1/job-sdk',
        specs: CommonJobSpecs,
      })
      routerApp.addMiddlewareBeforeInit(async (ctx, next) => {
        ctx.CommonJob = options.CommonJob
        await next()
      })
    },
    appDidLoad: () => {},
  }
}
