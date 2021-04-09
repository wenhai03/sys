import React, {useEffect} from 'react'
import {connect, ConnectProps} from 'umi'

import {Button, Card, Form, InputNumber, message, Modal} from 'antd'
import PickerTime from "@/components/PickerTime";
import {InfoCircleOutlined, ExclamationCircleOutlined} from '@ant-design/icons'


interface PageProps extends ConnectProps{
  model: any
}

const Index: React.FC<PageProps> = (props) => {
  const {dispatch, model} = props

  const [form] = Form.useForm();
   useEffect(() => {
    dispatch!({
      type: 'system/loadSysParamsData',
      payload: {}
    })
  }, [])

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

  const onChange = (value: any) => {
    if (value > 100000) {
      message.warning(`最多数值不能超过10万`)
    }
  }

  return (
    <Card
      title="数据采集参数："
      extra={<Button type="primary" onClick={onFinish}>保存</Button>}
    >


      <Form labelCol={{span: 5}} wrapperCol={{span: 8}} onFinish={onFinish} form={form}>
        <Form.Item label="自动采集触发时间" name="collectTime" rules={[{required: true, message: '请选择自动采集触发时间'}]}>
           <PickerTime />
        </Form.Item>
        <Form.Item
          label="每日自动采集数量"
          name="collectLimit"
          rules={[{required: true, message: '请选择采集数量'}]}
          tooltip={{ title: '与每日监控数量总和必须小于每日最高请求数', icon: <InfoCircleOutlined /> }}
          extra={<span style={{paddingLeft: 10, fontSize: 12, color: '#f50' }}>与每日监控数量总和必须小于每日最高请求数</span>}
        >
          <InputNumber onChange={onChange} placeholder="请选择采集数量" precision={0} min={0} max={100000} step={1} style={{width: '100%'}} />
        </Form.Item>
      </Form>

    </Card>
  )
}

export default connect((state: any) => {
   return {
     model: state.system.collectModel,
   }
})(Index)

