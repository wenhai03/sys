import React, {useEffect} from 'react';
import {connect} from 'umi'
import DatePickerTime from '@/components/DatePickerTime';

import {Modal, Form, Input,Select, message} from "antd";

const {Option} = Select

const AddForm = (props: any) => {
  const {dispatch, model, addShipDynamicVisible, imo, page, pageSize, onOk} = props
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(model)
  }, [model])

  const onCancel = () => {
    dispatch({
      type: 'ship/save',
      payload: {
        addShipDynamicVisible: false,
      }
    })
    form.resetFields()
  }

  const onFinish = () => {
    form.validateFields().then((values) => {
      const updateObj = {
        type: 'ship/updateEvent',
        payload: {...values, imo, id: model.id},
      }
      const addObj = {
        type: 'ship/saveEvent',
        payload: {...values, imo},
      }
      // 有id说明是编辑，否则新增
      dispatch(Object.keys(model).length ? updateObj : addObj).then((res: any) => {
        if (res) {
          onOk()
          form.setFieldsValue({
            happentime: '',
            eta: '',
            dest: '',
            location: '',
            status: '',
          })
        }
      })
    })
  }

  return (
    <Modal visible={addShipDynamicVisible} getContainer={false} title="添加船舶动态" onCancel={onCancel} onOk={onFinish}>
      <Form labelCol={{span: 6}}  onFinish={onFinish} form={form}>
        <Form.Item label="选择日期" name="happentime" rules={[{required: true, message: '请选择日期'}]}>
          <DatePickerTime />
        </Form.Item>

        <Form.Item label="选择预抵港日期" name="eta" rules={[{required: true, message: '请选择预抵港日期'}]}>
          <DatePickerTime />
        </Form.Item>

        <Form.Item label="预抵港名称" name="dest" rules={[{required: true, message: '请输入预抵港名称'}]}>
          <Input placeholder="请输入预抵港名称"/>
        </Form.Item>

        <Form.Item label="当前位置" name="location" rules={[{required: true, message: '请输入当前位置'}]}>
          <Input placeholder="请输入当前位置"/>
        </Form.Item>

        <Form.Item label="船舶状态" name="status" >
          <Select placeholder="请选择" allowClear style={{width: '100%'}}>
            <Option value="在航" key="在航">在航</Option>
            <Option value="锚泊" key="锚泊">锚泊</Option>
            <Option value="靠泊" key="靠泊">靠泊</Option>
            <Option value="未知" key="未知">未知</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

// @ts-ignore
const mapStateToProps = (state: any) => {
  const {ship: {addShipDynamicVisible, imo, current: model, page, pageSize}} = state
  return {
    addShipDynamicVisible,
    imo,
    model,
    page,
    pageSize,
  }
}

// @ts-ignore
export default connect(mapStateToProps)(AddForm);
