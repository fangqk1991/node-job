import { MyJobServer } from '../../src/services/MyJobServer'

describe('Test JobServer.test.ts', () => {
  it(`getPageResult`, async () => {
    const CommonJob = MyJobServer.CommonJob
    const pageResult = await CommonJob.getPageResult({
      'taskState.$in': 'Done',
    })
    console.info(pageResult)
  })
})
