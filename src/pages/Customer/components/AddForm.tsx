import React, {useEffect} from 'react';
import {connect} from 'umi'
import {Modal, Form, Input} from "antd";

const AddForm = (props: any) => {
  const {dispatch, addVisible, model, onOk} = props
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(model)
  }, [model])

  const onCancel = () => {
    dispatch({
      type: 'customer/save',
      payload: {
        addVisible: false,
        current: {}
      }
    })
    form.resetFields()
  }

  const onFinish = () => {
    form.validateFields().then((values) => {
      const updateObj = {
        type: 'customer/update',
        payload: {...values, id: model.id},
      }

      const addObj = {
        type: 'customer/insert',
        payload: values,
      }
      // 有id说明是编辑，否则新增
      dispatch(Object.keys(model).length ? updateObj : addObj).then((res: boolean) => {
        if (res) onOk()
      })
    })
  }

  return (
    <Modal visible={addVisible} getContainer={false} title={`${Object.keys(model).length ? '编辑' : '添加'}客户`} onCancel={onCancel} onOk={onFinish}>
      <Form labelCol={{span: 4}} onFinish={onFinish} form={form}>
        <Form.Item label="客户名称" name="name" rules={[{required: true, message: '请输入客户名称'}]}>
          <Input placeholder="请输入客户名称"/>
        </Form.Item>
        <Form.Item label="地址" name="address">
          <Input placeholder="请输入地址"/>
        </Form.Item>

        <Form.Item label="英文名称" name="enName">
          <Input placeholder="请输入英文名称"/>
        </Form.Item>

        <Form.Item label="联系电话" name="telephone" >
          <Input placeholder="请输入联系电话"/>
        </Form.Item>

        <Form.Item label="网址" name="url">
          <Input placeholder="请输入网址"/>
        </Form.Item>

        <Form.Item label="邮箱" name="email">
          <Input placeholder="请输入邮箱"/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

// @ts-ignore
const mapStateToProps = (state: any) => ({
  addVisible: state.customer.addVisible,
  model: state.customer.current
})

// @ts-ignore
export default connect(mapStateToProps)(AddForm);
