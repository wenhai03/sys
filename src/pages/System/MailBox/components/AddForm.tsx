import React, {useEffect, } from 'react'

import {Modal, Input, Form, Divider, Radio, message} from 'antd'
import {connect} from "umi";
import {InfoCircleOutlined} from "@ant-design/icons";


const AddForm = (props: any) => {
  const {dispatch, addEmailVisible, isEdit, emailItemInfo} = props
  const [form] = Form.useForm();

  useEffect(() => {
    console.log('emailItemInfo -> ', emailItemInfo.type)
    form.setFieldsValue(emailItemInfo)
  }, [emailItemInfo])

  const regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
  const emailReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;

  const onCancel = () => {
    dispatch({
      type: 'system/save',
      payload: {
        addEmailVisible: false,

      }
    })
    form.resetFields()
  }

  const onFinish = () => {
    form.validateFields().then((values) => {
      console.log('values -> ', values)
      const updateObj = {
        type: 'system/uploadEmailAccount',
        payload: {...values, id: emailItemInfo.id},
      }

      const addObj = {
        type: 'system/saveEmailAccount',
        payload: values,
      }
      // 有id说明是编辑，否则新增
      dispatch(Object.keys(emailItemInfo).length ? updateObj : addObj).then((res: any) => {
        if (res.msg === 'success' || res.code === 0) {
          message.success(`操作成功`);
          dispatch({
            type: 'system/save',
            payload: {
              addEmailVisible: false,
            }
          })
        }
        if (res.code === 500) {
          message.warning(`${res.msg}`);
        }
      })

    })
  }

  function validatePass(value:any){
    return regExp.test(value)
  }

  // @ts-ignore
  return (
    <Modal
      visible={addEmailVisible}
      title={isEdit ? '修改邮箱' : '添加邮箱'}
      onOk={onFinish}
      onCancel={onCancel}
    >
      <Form labelCol={{span: 4}} onFinish={onFinish} form={form}>
        <Form.Item label="邮箱类型" name="type" rules={[{required: true, message: '请选择类型'}]}>
          <Radio.Group >
            <Radio value={0}>营销邮箱</Radio>
            <Radio value={1}>伙食邮箱</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="邮箱账号"
          name="account"
          rules={[
            { required: true, message: "请输入邮箱账号！！"},
            () => ({
              validator(role, value) {
                if (!emailReg.test(value)) {
                  // eslint-disable-next-line prefer-promise-reject-errors
                  return Promise.reject("请输入正确的邮箱格式")
                }
                return Promise.resolve();
              }
            })
          ]}
        >
          <Input placeholder="请输入邮箱账号" style={{width: '100%'}}/>
        </Form.Item>
        <Form.Item
          label="密码"
          name="pwd"
          rules={[
            {required: true, message: "密码不能为空！！"},
          ]}
          tooltip={{ title: '密码为大于6位小于20位数字+字母', icon: <InfoCircleOutlined /> }}
        >
          <Input.Password placeholder="请输入密码" style={{width: '100%'}}/>
        </Form.Item>

      </Form>
    </Modal>
  )
}

// @ts-ignore
const mapStateToProps = (state: any) => ({
  addEmailVisible: state.system.addEmailVisible,
  emailItemInfo: state.system.emailItemInfo,
})

// @ts-ignore
export default connect(mapStateToProps)(AddForm);
