import { MyDatabase } from '../services/MyDatabase'
import { FilterOptions } from 'fc-feed'
import { GeneralJobService } from '@fangcha/job'
import { CommonJobModel } from '@fangcha/job-models'

export class CommonJob extends GeneralJobService.getClass_CommonJob(MyDatabase.jobDB) {
  public static AppName = 'Task'

  public constructor() {
    super()
  }

  public fc_searcher(params: FilterOptions = {}) {
    const searcher = super.fc_searcher(params)
    searcher.processor().addOrderRule('_rid', 'DESC')
    return searcher
  }

  public params(): any {
    const defaultData = {}
    try {
      return JSON.parse(this.paramsStr) || defaultData
    } catch (e) {}
    return defaultData
  }

  public toJSON() {
    return this.modelForClient()
  }

  public modelForClient() {
    const data = this.fc_pureModel() as CommonJobModel
    data.params = this.params()
    return data
  }
}
