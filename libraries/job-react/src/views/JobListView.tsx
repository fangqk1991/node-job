import React, { useEffect, useReducer, useState } from 'react'
import { MyRequest } from '@fangcha/auth-react'
import { Button, Divider, message, Space } from 'antd'
import { ColumnFilterType, JsonPre, TableView, TableViewColumn, useQueryParams } from '@fangcha/react'
import { FT, PageResult } from '@fangcha/tools'
import { CommonJobApis, CommonJobModel, CommonJobStateDescriptor, JobCenterOptions } from '@fangcha/job-models'
import { ProForm } from '@ant-design/pro-components'
import { JobDialog } from './JobDialog'

export const JobListView: React.FC = () => {
  const [metadata, setMetadata] = useState<JobCenterOptions>({
    queues: [],
    taskNames: [],
  })
  const { queryParams, updateQueryParams, setQueryParams } = useQueryParams<
    CommonJobModel & {
      'taskState.$in': string
      'taskName.$in': string
    }
  >()
  useEffect(() => {
    MyRequest(CommonJobApis.JobCenterMetadataGet)
      .quickSend()
      .then((response) => {
        setMetadata(response)
      })
  }, [])
  const [_, reloadData] = useReducer((x) => x + 1, 0)

  return (
    <div>
      <h3>任务列表</h3>
      <Divider />
      <ProForm autoFocusFirstInput={false} submitter={false}>
        <ProForm.Group>
          <ProForm.Item>
            <Button
              type={'primary'}
              onClick={() => {
                const dialog = new JobDialog({})
                dialog.show(async (params) => {
                  const request = MyRequest(CommonJobApis.JobCreate)
                  request.setBodyData(params)
                  await request.quickSend()
                  reloadData()
                })
              }}
            >
              创建任务
            </Button>
          </ProForm.Item>
          <ProForm.Item>
            <Button
              onClick={() => {
                setQueryParams({})
              }}
            >
              重置过滤器
            </Button>
          </ProForm.Item>
        </ProForm.Group>
      </ProForm>
      <TableView
        rowKey={(item: CommonJobModel) => {
          return item.jobId
        }}
        columns={TableViewColumn.makeColumns<CommonJobModel>([
          {
            title: 'App · Queue / ID',
            render: (item) => (
              <>
                {item.app} · {item.queue}
                <br />
                {item.jobId}
              </>
            ),
          },
          {
            title: '任务名称',
            filterType: ColumnFilterType.StrMultiSelector,
            options: metadata.taskNames.map((item) => ({ label: item, value: item })),
            value: queryParams['taskName.$in'] || '',
            onValueChanged: (newVal) => {
              updateQueryParams({
                'taskName.$in': newVal,
              })
            },
            render: (item) => item.taskName,
          },
          {
            title: '任务参数',
            render: (item) => <JsonPre value={item.params}></JsonPre>,
          },
          {
            title: '状态',
            filterType: ColumnFilterType.StrMultiSelector,
            options: CommonJobStateDescriptor.options(),
            value: queryParams['taskState.$in'] || '',
            onValueChanged: (newVal) => {
              updateQueryParams({
                'taskState.$in': newVal,
              })
            },
            render: (item) => item.taskState,
          },
          {
            title: '等待时间',
            render: (item) => (
              <span>
                <b>{item.pendingElapsed}</b>ms
              </span>
            ),
          },
          {
            title: '执行耗时',
            render: (item) => (
              <span>
                <b>{item.performElapsed}</b>ms
              </span>
            ),
          },
          // errorMessage: string
          {
            title: '创建时间 / 更新时间',
            render: (item) => (
              <>
                {FT(item.createTime)}
                <br />
                {FT(item.updateTime)}
              </>
            ),
          },
          {
            title: '操作',
            render: (item) => (
              <Space>
                <a
                  onClick={() => {
                    const dialog = new JobDialog({
                      jobParams: {
                        queue: item.queue,
                        taskName: item.taskName,
                        params: item.params,
                      },
                    })
                    dialog.show(async (params) => {
                      const request = MyRequest(CommonJobApis.JobCreate)
                      request.setBodyData(params)
                      await request.quickSend()
                      reloadData()
                    })
                  }}
                >
                  复制
                </a>
              </Space>
            ),
          },
        ])}
        loadData={async (retainParams) => {
          const request = MyRequest(CommonJobApis.JobPageDataGet)
          request.setQueryParams({
            ...retainParams,
            ...queryParams,
          })
          return request.quickSend<PageResult<CommonJobModel>>()
        }}
      />
    </div>
  )
}
