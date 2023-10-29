import { ResqueProtocol } from './ResqueProtocol'
import { FCMaster, Resque } from '@fangcha/resque'
import { ResqueObserverHelper } from './ResqueObserverHelper'
import { AppPluginProtocol } from '@fangcha/backend-kit'
import { GeneralJobService } from '@fangcha/job'

export const ResqueSdkPlugin = (options: ResqueProtocol): AppPluginProtocol => {
  return {
    appDidLoad: (app) => {
      if (!options.observer && options.jobDatabase) {
        class CommonJob extends GeneralJobService.getClass_CommonJob(options.jobDatabase) {}
        if (options.jobAppName) {
          CommonJob.AppName = options.jobAppName
        }
        options.observer = ResqueObserverHelper.makeTypicalObserver(CommonJob)
      }
      Resque.addObserver(options.observer || ResqueObserverHelper.makeDefaultObserver())

      for (const plugin of app.plugins) {
        if (plugin.resqueModuleMap) {
          options.moduleMapData = {
            ...options.moduleMapData,
            ...plugin.resqueModuleMap,
          }
        }
      }

      const master = new FCMaster(options)
      master.run()
    },
  }
}
