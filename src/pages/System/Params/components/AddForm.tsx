import React, {useEffect} from 'react'

import {Modal, InputNumber, Input, Form, message} from 'antd'
import {connect} from "umi";

const AddForm = (props: any) => {
  const {dispatch, addVisible, frequencyItemInfo} = props

  const [form] = Form.useForm();

  // 当前选中改变之后重新设置表单显示的默认数据
  useEffect(() => {
    if (Object.keys(frequencyItemInfo).length) {
      console.log('frequencyItemInfo -> ', frequencyItemInfo)
      form.setFieldsValue(frequencyItemInfo)
    }
  }, [frequencyItemInfo])

  const onCancel = () => {
    dispatch({
      type: 'system/save',
      payload: {
        addVisible: false,
        frequencyItemInfo: {}
      }
    })
    form.resetFields()
  }

  const onFinish = () => {
    form.validateFields().then((values) => {
      const updateObj = {
        type: 'system/setMonitorRateConfig',
        payload: {
          paramKey: values.country,
          paramValue: values.days,
          paramValue1: values.preDays,
          type: 5,
          id: frequencyItemInfo.id
        },
      }

      const addObj = {
        type: 'system/insert',
        payload: {
          paramKey: values.country,
          paramValue: values.days,
          paramValue1: values.preDays,
          type: 5
        },
      }

      const r = Object.keys(frequencyItemInfo).length
      console.log('r -> ', r)

      // 有id说明是编辑，否则新增
      dispatch(Object.keys(frequencyItemInfo).length ? updateObj : addObj).then((res: any) => {
        if (res.msg === 'success' || res.code === 0) {
          message.success(`操作成功`);
        }
        if (res.code === 500) {
          message.warning(`${res.msg}`);
        }
        form.resetFields()
      })
    })
  }

  // @ts-ignore
  return (
    <Modal
      visible={addVisible}
      title="监控频率"
      onOk={onFinish}
      onCancel={onCancel}
    >
      <Form labelCol={{span: 6}} onFinish={onFinish} form={form}>
        <Form.Item label="航区" name="country" rules={[
          {required: true, message: '请选择航区'},
          () => ({
            // eslint-disable-next-line consistent-return
            validator(rule, value) {
              const reg = /^[a-zA-Z\u4e00-\u9fa5, ',']+$/g;
               if (!reg.test(value)) {
                 // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject('只能是字母和汉字,如果有逗号必须是英文逗号！');
              }
              return Promise.resolve();
            },
          }),
          ]}>
          <Input placeholder="请选择航区"/>
        </Form.Item>

        <Form.Item label="在航间隔天数" name="days" rules={[{required: true, message: '请输入在航间隔天数'}]}>
          <InputNumber precision={0} min={0} max={100000} step={1} style={{width: '100%'}} placeholder="请输入在航间隔天数"/>
        </Form.Item>

        <Form.Item label="靠泊提前天数" name="preDays" rules={[{required: true, message: '请输入靠泊提前天数'}]}>
          <InputNumber precision={0} min={0} max={100000} step={1} style={{width: '100%'}} placeholder="请输入靠泊提前天数"/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

// @ts-ignore
const mapStateToProps = (state: any) => ({
  addVisible: state.system.addVisible,
  frequencyItemInfo: state.system.frequencyItemInfo,
})

// @ts-ignore
export default connect(mapStateToProps)(AddForm);
