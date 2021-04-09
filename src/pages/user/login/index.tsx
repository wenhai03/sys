// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import React, {useState} from 'react';
import {message,} from 'antd';
import {getPageQuery, setToken, setUserName} from '@/utils/utils';
import logo from '../../../../public/logo.jpeg';
import {LoginParamsType} from '@/services/login';
import {login} from '@/services/auth';
import Footer from '@/components/Footer';
import TextHoverEffect from '@/components/TextHoverEffect';
import LoginFrom from './components/Login';
import styles from './style.less';

const {Username, Password, Submit} = LoginFrom;

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
const replaceGoto = () => {
  const urlParams = new URL(window.location.href);
  const params = getPageQuery();
  let {redirect} = params as { redirect: string };
  if (redirect) {
    const redirectUrlParams = new URL(redirect);
    if (redirectUrlParams.origin === urlParams.origin) {
      redirect = redirect.substr(urlParams.origin.length);
      if (redirect.match(/^\/.*#/)) {
        redirect = redirect.substr(redirect.indexOf('#'));
      }
    } else {
      window.location.href = '/';
      return;
    }
  }

  const r = urlParams.href.split(urlParams.pathname)[0] + (redirect || '/')
  console.log('r -> ', r)
  window.location.href = r;
};

const Login: React.FC<{}> = () => {
  const [submitting, setSubmitting] = useState(false);
  const [type, setType] = useState<string>('account');

  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);
    try {
      // 登录
      const data = await login(values);
      if (data.code === 0) {
        message.success('登录成功！');
        setToken(data.token)
        setUserName(data)
        replaceGoto()
        return;
      }
      message.warning(`${data.msg}`);
      // 如果失败去设置用户错误信息
      // setUserLoginState(data);
    } catch (error) {
      message.error('登录失败，请重试！');
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.container} style={{overflow: 'hidden'}}>
      <div className={styles.content} style={{marginTop: 50}}>
        <div className={styles.top}>
          <div className={styles.login_header}>
            <img alt="logo" className={styles.login_logo} src={logo}/>
            <TextHoverEffect text="船舶自动采集系统"/>
          </div>
        </div>

        <div className={styles.main} style={{overflow: 'hidden'}}>
          <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
            <Username
              name="username"
              placeholder="请输入用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <Password
              name="password"
              placeholder="请输入密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
            <Submit loading={submitting}>登录</Submit>
          </LoginFrom>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
