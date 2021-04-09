import React, {useEffect} from 'react'

import {Button, Card, Form, InputNumber, message, Modal} from 'antd'
import PickerTime from "@/components/PickerTime";
import {ExclamationCircleOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {connect, ConnectProps} from "umi";


interface PageProps extends ConnectProps{
  model: any
}

const Index: React.FC<PageProps> = (props) => {
  const [form] = Form.useForm();
  const {dispatch, model} = props

  useEffect(() => {
    form.setFieldsValue(model)
  }, [model])

  const onFinish = () => {
    form.validateFields().then((values) => {
      const params = {...values}
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
      title="数据监控参数："
      extra={<Button type="primary" onClick={onFinish}>保存</Button>}
    >
      <Form labelCol={{span: 5}} wrapperCol={{span: 8}} onFinish={onFinish} form={form}>
        <Form.Item label="船舶监控触发时间" name="monitorTime" rules={[{required: true, message: '请选择船舶监控触发时间'}]}>
          <PickerTime />
        </Form.Item>
        <Form.Item
          label="每日监控数量"
          name="monitorLimit"
          rules={[{required: true, message: '请选择数量'}]}
          tooltip={{ title: '与每日自动采集数量总和必须小于每日最高请求数', icon: <InfoCircleOutlined /> }}
          extra={<span style={{paddingLeft: 10, fontSize: 12, color: '#f50' }}>与每日自动采集数量总和必须小于每日最高请求数</span>}
        >
          <InputNumber precision={0} onChange={onChange} placeholder="请选择船舶名称" min={0} max={100000} step={1} style={{width: '100%'}} />
        </Form.Item>

        <Form.Item
          label="监控默认值"
          name="monitorDefaultDay"
          rules={[{required: true, message: '请输入天数'}]}
          tooltip={{ title: '在船讯网上没有事件记录和监控频率配置中没有配置的地区的默认监控间隔天数', icon: <InfoCircleOutlined /> }}
          extra={<span style={{paddingLeft: 10, fontSize: 12, color: '#f50' }}>在船讯网上没有事件记录和监控频率配置中没有配置的地区的默认监控间隔天数</span>}
        >
          <InputNumber precision={0} onChange={onChange} placeholder="请输入天数" min={0} max={100000} step={1} style={{width: '100%'}} />
        </Form.Item>
      </Form>

    </Card>
  )
}

export default connect((state: any) => {
  return {
    model: state.system.monitorModel,
  }
})(Index)
