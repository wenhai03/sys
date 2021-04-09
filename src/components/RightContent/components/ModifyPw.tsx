import React, {useEffect, } from 'react'

import { Modal, Input, Form, Divider} from 'antd'
import {connect} from "umi";
import {InfoCircleOutlined} from "@ant-design/icons";


const ModifyPw = (props: any) => {
  const {dispatch, addAccountVisible, isEdit, userId} = props

  const [form] = Form.useForm();

  const regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;


  // 当前选中改变之后重新设置表单显示的默认数据

  const onCancel = () => {
    dispatch({
      type: 'system/save',
      payload: {
        addAccountVisible: false,
      }
    })
    form.resetFields()
  }

  const onFinish = () => {
    form.validateFields().then((values) => {
      //  isEdit为true修改密码，否则新增
      if (isEdit) {
        dispatch({
          type: 'system/updatePwd',
          payload: {...values, userId},
        })
      } else {
        dispatch({
          type: 'system/addAccount',
          payload: values,
        })
      }

    })
  }

  function validatePass(value:any){
    return regExp.test(value)
  }

  // @ts-ignore
  return (
    <Modal
      visible={addAccountVisible}
      title="修改密码"
      onOk={onFinish}
      onCancel={onCancel}
    >
      <Form labelCol={{span: 4}} onFinish={onFinish} form={form}>
        {
          !isEdit && <Form.Item
            label="账号名称"
            name="username"
            rules={[{required: true, message: '请输入账号名称'}]}
          >
            <Input placeholder="请输入账号名称"/>
          </Form.Item>
        }

        <Form.Item
          label="密码"
          name="password"

          rules={[
            {required: true, message: "密码不能为空！！"},
            ({getFieldValue}) => ({
              validator(role, value) {
                const passwordsValue = getFieldValue("passwords"); // 获取再次输入密码的值
                if (!validatePass(value)) {
                  // eslint-disable-next-line prefer-promise-reject-errors
                  return Promise.reject("请输入大于6位小于20位数字+字母")
                }
                if (passwordsValue && value !== passwordsValue) {
                  // eslint-disable-next-line prefer-promise-reject-errors
                  return Promise.reject("两次密码不一致")
                }
                return Promise.resolve();
              }
            })
          ]}
          tooltip={{ title: '密码为大于6位小于20位数字+字母', icon: <InfoCircleOutlined /> }}
          extra={<span style={{paddingLeft: 10, fontSize: 12, color: '#f50' }}>密码为大于6位小于20位数字+字母</span>}
        >
          <Input.Password placeholder="请输入密码" style={{width: '100%'}}/>
        </Form.Item>
        <Form.Item
          label="重复密码"
          name="rePassword"
          rules={[
            { required: true, message: "再次确认密码不能为空！！" },
            ({ getFieldValue }) => ({
              validator(role, value){
                if(value !== getFieldValue("password")){
                  // eslint-disable-next-line prefer-promise-reject-errors
                  return Promise.reject("两次密码不一致")
                }
                return Promise.resolve();
              }
            })
          ]}
        >
          <Input.Password placeholder="请再次密码" style={{width: '100%'}}/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

// @ts-ignore
const mapStateToProps = (state: any) => ({
  addAccountVisible: state.system.addAccountVisible,
  isEdit: state.system.isEdit,
  userId:  state.system.userId,
})

// @ts-ignore
export default connect(mapStateToProps)(ModifyPw);
