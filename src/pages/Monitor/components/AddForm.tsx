import React, {useEffect} from 'react';
import {connect} from 'umi'
import {Modal, Form, Input} from "antd";

const AddForm = (props: any) => {
  const {dispatch, model, addVisible} = props

  const [form] = Form.useForm();

  // 当前选中改变之后重新设置表单显示的默认数据
  useEffect(() => {
    // form.setFieldsValue(model)
  }, [model])
  const onCancel = () => {
    dispatch({
      type: 'monitor/save',
      payload: {
        addVisible: false,
        imo: ''
      }
    })
    form.setFieldsValue({imo: ''})
  }

  const onFinish = () => {
    form.validateFields().then((values) => {
      dispatch({
        type: 'monitor/insert',
        payload: values,
      })
    })
  }

  return (
    <Modal visible={addVisible} getContainer={false} title="添加客户" onCancel={onCancel} onOk={onFinish}>
      <Form labelCol={{span: 4}} onFinish={onFinish} form={form}>
        <Form.Item label="客户名称" name="name" rules={[{required: true, message: '请输入客户名称'}]}>
          <Input placeholder="请输入客户名称"/>
        </Form.Item>

        <Form.Item label="英文名称" name="enName" rules={[{required: true, message: '请输入英文名称'}]}>
          <Input placeholder="请输入英文名称"/>
        </Form.Item>

        <Form.Item label="联系电话" name="telephone" rules={[{required: true, message: '请输入联系电话'}]}>
          <Input placeholder="请输入联系电话"/>
        </Form.Item>

        <Form.Item label="网址" name="url" rules={[{required: true, message: '请输入网址'}]}>
          <Input placeholder="请输入网址"/>
        </Form.Item>

        <Form.Item label="邮箱" name="email" rules={[{required: true, message: '请输入邮箱'}]}>
          <Input placeholder="请输入邮箱"/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

// @ts-ignore
const mapStateToProps = (state: any) => ({
  addVisible: state.monitor.addVisible
})

// @ts-ignore
export default connect(mapStateToProps)(AddForm);
