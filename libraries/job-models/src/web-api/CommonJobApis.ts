import { Api, SwaggerParameter } from '@fangcha/swagger'

export const CommonJobApis = {
  JobPageDataGet: {
    method: 'GET',
    route: '/api/job-sdk/v1/common-job',
    description: 'Common Job Page Data Get',
  },
  JobCreate: {
    method: 'POST',
    route: '/api/job-sdk/v1/common-job',
    parameters: [
      {
        name: 'bodyData',
        type: 'object',
        in: 'body',
        description: 'Stock code list',
        properties: {
          queue: {
            type: 'string',
          },
          taskName: {
            type: 'string',
          },
          params: {
            type: 'object',
            properties: {},
          },
        },
      },
    ] as SwaggerParameter[],
    description: 'JobCreate',
  } as Api,
  JobCenterMetadataGet: {
    method: 'GET',
    route: '/api/job-sdk/v1/job-center-metadata',
    description: 'Job Center Metadata Get',
  },
}
