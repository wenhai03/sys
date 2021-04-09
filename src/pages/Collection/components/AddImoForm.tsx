import React, {useEffect} from 'react';
import {connect} from 'umi'
import {Modal, Form, Input} from "antd";


const AddImoForm = (props: any) => {
  const { dispatch, model, showAddImo} = props

  const [form] = Form.useForm();

  // 当前选中改变之后重新设置表单显示的默认数据
  useEffect(() => {
    // form.setFieldsValue(model)
  }, [model])
  const onCancel = () => {
    dispatch({
      type: 'collection/save',
      payload: {
        showAddImo: false,
        imo: ''
      }
    })
    form.setFieldsValue({imo: ''})
  }

  const onFinish = () => {
    form.validateFields().then((values) => {
      dispatch({
        type: 'collection/insert',
        payload: values,
      })
    })
  }

  return (
    <Modal visible={showAddImo} getContainer={false} title="添加IMO" onCancel={onCancel} onOk={onFinish}>
      <Form labelCol={{span: 4}} onFinish={onFinish} form={form}>
        <Form.Item label="IMO" name="imo" rules={[{required: true, message: '请输入Imo'}]}>
          <Input placeholder="请输入IMO"/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state: any) => ({
  showAddImo: state.collection.showAddImo
})

export default connect(mapStateToProps)(AddImoForm);
