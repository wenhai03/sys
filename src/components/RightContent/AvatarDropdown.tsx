import React, {useCallback, useState} from 'react';
import {LogoutOutlined, SettingOutlined, UserOutlined, EditOutlined, InfoCircleOutlined} from '@ant-design/icons';
import {Avatar, Form, Input, Menu, Modal, Spin} from 'antd';

import {history, useModel, connect} from 'umi';
import {getPageQuery, getToken} from '@/utils/utils';
import {logout} from "@/services/auth";
import {stringify} from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';


export interface GlobalHeaderRightProps {
  menu?: boolean;
}

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  const {redirect} = getPageQuery();
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    await logout({
      "token": getToken()
    })

    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: window.location.href,
      }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({menu}) => {
  const {initialState, setInitialState} = useModel('@@initialState');
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const onMenuClick = useCallback(
    (event: {
      key: React.Key;
      keyPath: React.Key[];
      item: React.ReactInstance;
      domEvent: React.MouseEvent<HTMLElement>;
    }) => {
      const {key} = event;
      if (key === 'logout') {
        setInitialState({...initialState, currentUser: undefined});
        loginOut();
        return;
      }
      if (key === 'modifyPw') {
        return;
      }
      history.push(`/account/${key}`);
    },
    [],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const {currentUser} = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined/>
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined/>
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider/>}

      <Menu.Item key="logout">
        <LogoutOutlined/>
        退出登录
      </Menu.Item>

      {/* <Menu.Item key="modifyPw">
        <EditOutlined/>
        修改密码
      </Menu.Item> */}
    </Menu>
  );

  function validatePass(value:any){
    const regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    return regExp.test(value)
  }

  return (
    <>
      <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar"/>
        <span className={`${styles.name} anticon`}>{currentUser.name}</span>
      </span>



      </HeaderDropdown>
      <Modal
        visible={visible}
        title="修改密码"
        onOk={() => {

        }}
        onCancel={() => {
          setVisible(false)
        }}
      >
        <Form labelCol={{span: 4}} onFinish={() => {

        }} form={form}>

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
    </>
  );
};

/* const mapStateToProps = (state: any) => ({
  addAccountVisible: state.system.addAccountVisible,
  isEdit: state.system.isEdit,
  userId:  state.system.userId,
}) */

// @ts-ignore
export default AvatarDropdown

