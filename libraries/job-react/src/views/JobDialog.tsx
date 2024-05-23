import React, { useState } from 'react'
import { DialogProps, ReactDialog } from '@fangcha/react'
import { ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import { Form, message } from 'antd'
import { JobParams } from '@fangcha/job-models'
import AppError from '@fangcha/app-error'

interface Props extends DialogProps {
  jobParams?: JobParams
}

export class JobDialog extends ReactDialog<Props, JobParams> {
  width = '70%'
  title = '创建任务'

  public rawComponent(): React.FC<Props> {
    return (props) => {
      const [params] = useState(() => {
        const data = JSON.parse(
          JSON.stringify(
            props.jobParams ||
              ({
                queue: '',
                taskName: '',
                params: {},
              } as JobParams)
          )
        ) as JobParams
        data['paramsStr'] = JSON.stringify(data.params || {})
        return data
      })

      const [form] = Form.useForm()
      props.context.handleResult = () => {
        let params = {}
        try {
          params = JSON.parse(form.getFieldValue('paramsStr') || '{}') || {}
        } catch (e) {
          message.error('JSON 格式有误')
          throw new AppError('JSON 格式有误')
        }

        return {
          ...form.getFieldsValue(),
          params: params,
        }
      }
      return (
        <ProForm form={form} autoFocusFirstInput initialValues={params} submitter={false}>
          <ProFormText name={'queue'} label={'queue'} required={true} />
          <ProFormText name={'taskName'} label={'taskName'} required={true} />
          <ProFormTextArea
            name={'paramsStr'}
            label={'params'}
            fieldProps={{
              rows: 6,
            }}
          />
        </ProForm>
      )
    }
  }
}
