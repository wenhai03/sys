import React, {useEffect} from 'react';
import {connect} from 'umi'
import {Modal, Form} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";

const AddForm = (props: any) => {
  const {dispatch, model, addMonitorVisible} = props

  const [form] = Form.useForm();

  // 当前选中改变之后重新设置表单显示的默认数据
  useEffect(() => {
    // form.setFieldsValue(model)
  }, [model])
  const onCancel = () => {
    dispatch({
      type: 'ship/save',
      payload: {
        addMonitorVisible: false,
      }
    })
    form.setFieldsValue({isMonitor: ''})
  }

  const onFinish = () => {
    form.validateFields().then((values) => {
      dispatch({
        type: 'ship/saveMonitor',
        payload: values,
      })
    })
  }

  return (
    <Modal visible={addMonitorVisible} getContainer={false} title="添加监控" onCancel={onCancel} onOk={onFinish}>
      <Form labelCol={{span: 5}}  onFinish={onFinish} form={form}>
        <p><ExclamationCircleOutlined /> 是否添加监控</p>
      </Form>
    </Modal>
  );
};

// @ts-ignore
const mapStateToProps = (state: any) => ({
  addMonitorVisible: state.ship.addMonitorVisible
})

// @ts-ignore
export default connect(mapStateToProps)(AddForm);
