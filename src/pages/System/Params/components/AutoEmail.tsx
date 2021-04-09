import React, {useEffect} from 'react'
import {connect, ConnectProps} from 'umi'
import moment from 'moment'

import {Button, Card, Form, InputNumber, Modal, Input} from 'antd'
import DatePickerTime from "@/components/DatePickerTime";
import {InfoCircleOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import InputNum from './InputNum'


interface PageProps extends ConnectProps{
  model: any
}

const Index: React.FC<PageProps> = (props) => {
  const {dispatch, model} = props

  const [form] = Form.useForm();

  console.log('model autoEmailModel-> ', model)

   useEffect(() => {
    form.setFieldsValue(model)
  }, [model])

  const onFinish = () => {
    form.validateFields().then((values) => {
      const params = {...values}
      console.log('params -> ', params)

      Modal.confirm({
        title: '保存',
        icon: <ExclamationCircleOutlined />,
        content: '是否保存 ...',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          dispatch!({
            type: 'system/updateSysParams',
            payload: params
          })
        }
      });
    })
  }

  return (
    <Card
      title="自动邮件参数："
      extra={<Button type="primary" onClick={onFinish}>保存</Button>}
    >
      <Form labelCol={{span: 5}} wrapperCol={{span: 8}} onFinish={onFinish} form={form}>
        <Form.Item label="预抵港时间" name="etaDays" rules={[{required: true, message: '请选择预抵港时间'}]}>
          {/* <Input.Group compact >
            <InputNumber value={200} min={0} max={10000} style={{width: '80%'}}  step={1} placeholder="请选择"/>

            <Button type='default' style={{width: '20%', cursor: 'none'}} >天</Button>
          </Input.Group> */}
          <InputNum suffixText="天" />
        </Form.Item>
        <Form.Item label="邮件间隔时间" name="nextSend" rules={[{required: true, message: '请选择邮件间隔时间'}]}>

          <InputNum suffixText="天" />
          {/* <Input.Group compact >
            <InputNumber value={100} min={0} max={10000} step={1} style={{width: '80%'}} placeholder="请选择"/>
            <Button type='default' style={{width: '20%', cursor: 'none'}} >天</Button>
          </Input.Group> */}

        </Form.Item>
      </Form>

    </Card>
  )
}

export default connect((state: any) => {
   return {
     model: state.system.autoEmailModel,
   }
})(Index)

