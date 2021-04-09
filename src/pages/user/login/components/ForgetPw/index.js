import React, { useState, useMemo } from 'react';
import { Form, Input, Button, Checkbox, Modal } from 'antd';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

const ForgetPw = (props) => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const visible = useMemo(() => {
     return props.visible
  }, [props.visible])

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleOk = e => {
    console.log(e);

  };

  const handleCancel = e => {
    console.log(e);
    props.setVisible(false)
  };

  return (
    <Modal
      title="重置登录密码"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="手机号"
          name="phone"
          rules={[
            {
              required: true,
              message: '请输入手机号!',
            },
          ]}
        >
          <Input placeholder="请输入手机号"/>
        </Form.Item>

        <Form.Item
          label="验证码"
          name="code"
          rules={[
            {
              required: true,
              message: '请输入验证码!',
            },
          ]}
        >
          <Input placeholder="请输入验证码"/>
        </Form.Item>

        <Form.Item
          label="新登录密码"
          name="password"
          rules={[
            {
              required: true,
              message: '新登录密码',
            },
          ]}
        >
          <Input.Password placeholder="请输入新登录密码"/>
        </Form.Item>

        <Form.Item
          label="重复登录密码"
          name="repeatPw"
          rules={[
            {
              required: true,
              message: '重复登录密码!',
            },
          ]}
        >
          <Input.Password placeholder="请再次输入新的登录密码"/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ForgetPw
