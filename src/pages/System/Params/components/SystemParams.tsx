import React, {useEffect} from 'react'

import {Button, Card, Form, Input, InputNumber, Modal, message} from 'antd'
import {ExclamationCircleOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {connect} from "umi";

interface PageProps {
}

const Index: React.FC<PageProps> = (props) => {
  // @ts-ignore
  const {dispatch, model} = props
  const [form] = Form.useForm();
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
      title="系统参数："
      extra={
        <>
        <Button type="primary" onClick={onFinish}>保存</Button>
      </>}

    >
      <Form labelCol={{span: 5}} wrapperCol={{span: 8}} onFinish={onFinish} form={form}>
        <Form.Item
          label="每日最高请求数"
          name="limit"
          rules={[{required: true, message: '请选择自动采集触发时间'}]}
          tooltip={{ title: '船讯网账号每日监控量和数据采集量可触发总和上限', icon: <InfoCircleOutlined /> }}
          extra={<span style={{paddingLeft: 10, fontSize: 12, color: '#f50' }}>船讯网账号每日监控量和数据采集量可触发总和上限</span>}
        >
          <InputNumber precision={0} onChange={onChange} placeholder="请选择每日最高请求数" min={0} max={100000}  step={1} style={{width: '100%'}} />
        </Form.Item>

        <Form.Item label="船讯网账号" name="cxAccount" rules={[{required: true, message: '请输入船讯网账号'}]}>
          <Input placeholder="请选择每日最高请求数" />
        </Form.Item>

        <Form.Item label="船讯网密码" name="cxPassword" rules={[{required: true, message: '请输入船讯网密码'}]}>
          <Input.Password placeholder="请输入船讯网密码" style={{width: '100%'}}  />
        </Form.Item>

        {/* <Form.Item label="邮箱账号" name="emailAccount" rules={[{required: true, message: '请输入邮箱账号'}]}>
          <Input placeholder="请输入邮箱账号" />
        </Form.Item>

        <Form.Item label="邮箱密码" name="emailPassword" rules={[{required: true, message: '请输入邮箱密码'}]}>
          <Input.Password placeholder="请输入邮箱密码" style={{width: '100%'}}  />
        </Form.Item> */}
      </Form>

    </Card>
  )
}

export default connect((state: any) => {
  return {
    model: state.system.systemParamsModel,
  }
})(Index)

