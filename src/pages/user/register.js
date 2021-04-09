import React, {Fragment} from 'react';

// ANTD
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
// 验证
// import { validate_pass } from "../../utils/validate";
// API
// import { Register } from "../../api/account";
// 组件
// import Code from "../../components/code/index";
import styles from './login/style.less';

const validatePass = function (value){
  const regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
  return regPassword.test(value)
}
function RegisterForm (props){

  /** input输入处理 */
  const inputChangeUsername = (e) => {
    /* let value = e.target.value;
    this.setState({
      username: value
    }) */
  }
  const inputChangePassword = (e) => {
    /* let value = e.target.value;
    this.setState({
      password: value
    }) */
  }
  const inputChangeCode = (e) => {
    /* let value = e.target.value;
    this.setState({
      code: value
    }) */
  }


  const toogleForm = () => {
    // 调父级的方法
    props.switchForm("login");
  }

  const  onFinish = (values) => {
    console.log('values -> ', values)
    /* const requestData = {
      username: this.state.username,
      password: CryptoJs.MD5(this.state.password).toString(),
      code: this.state.code
    } */
    /* Register(requestData).then(response => {
      const data = response.data;
      message.success(data.message)
      if(data.resCode === 0) {
        this.toogleForm();
      }
    }).catch(error => {

    }) */
  };

  return (
    <Fragment>
      <div className={styles.registerContent}>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item name="username" rules={[
            { required: true, message: "邮箱不能为空！！" },
            { type: "email", message: "邮箱格式不正确"}
          ]} >
            <Input onChange={inputChangeUsername} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item name="password" rules={[
            { required: true, message: "密码不能为空！！" },
            ({ getFieldValue }) => ({
              validator(role, value){
                const passwords_value = getFieldValue("passwords"); // 获取再次输入密码的值
                if(!validatePass(value)){
                  // eslint-disable-next-line new-cap
                  return new Promise.reject("请输入大于6位小于20位数字+字母")
                }
                if(passwords_value && value !== passwords_value) {
                  return Promise.reject("两次密码不一致")
                }
                return Promise.resolve();
              }
            })
          ]} >
            <Input type="password" onChange={inputChangePassword} prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="请输入密码" />
          </Form.Item>
          <Form.Item name="passwords" rules={[
            { required: true, message: "再次确认密码不能为空！！" },
            ({ getFieldValue }) => ({
              validator(role, value){
                if(value !== getFieldValue("password")){
                  return new Promise.reject("两次密码不一致")
                }
                return Promise.resolve();
              }
            })
          ]} >
            <Input type="password" prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="请再次输入密码" />
          </Form.Item>
          <Form.Item name="code" rules={[
            { required: true, message: "请输入长度为6位的字符", len: 6 }
          ]} >
            <Row gutter={13}>
              <Col span={15}>
                <Input onChange={inputChangeCode} prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="请输入验证码" />
              </Col>
              <Col span={9}>
                {/* <Code username={username} module={module} /> */}
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" block> 注册 </Button>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  )
}

export default RegisterForm
