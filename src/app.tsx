import React from 'react';
import {BasicLayoutProps, Settings as LayoutSettings} from '@ant-design/pro-layout';
import {notification, message} from 'antd';
import {history, RequestConfig} from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import {getToken, getUserName} from '@/utils/utils';
import {RequestInterceptor, RequestOptionsInit, ResponseError} from 'umi-request';
// import { queryCurrent } from './services/user';
import defaultSettings from '../config/defaultSettings';

export async function getInitialState(): Promise<{
  currentUser?: API.CurrentUser;
  settings?: LayoutSettings;
}> {
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/user/login') {
    // console.log('如果是登录页面，不执行 -> ')
    try {
      // const currentUser = await queryCurrent();
      const r = JSON.parse(getUserName())
      // console.log('r 000-> ', r)
      // console.log('r -> ', r.name)
      return {
        currentUser: {
          userid: r.userid,
          access: r.access === 0 ? 'admin' : 'user',
          avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1493732932,619486577&fm=26&gp=0.jpg',
          name: r.name || 'admin',
        },
        settings: defaultSettings,
      };
    } catch (error) {
      history.push('/user/login');
    }
  }
  const r = JSON.parse(getUserName())
  return {
    currentUser: {
      userid: r.userid,
      access: r.access === 0 ? 'admin' : 'user',
      avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1493732932,619486577&fm=26&gp=0.jpg',
      name: r.name || 'admin',
    },
    settings: defaultSettings,
  };


}

export const layout = ({
                         initialState,
                       }: {
  initialState: { settings?: LayoutSettings; currentUser?: API.CurrentUser };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent/>,
    disableContentMargin: false,
    // footerRender: () => null,
    onPageChange: () => {
      // 如果没有登录，重定向到 login
      /* if (!initialState?.currentUser?.userid && history.location.pathname !== '/user/login') {
       history.push('/user/login');
     } */

      if (!getToken()) {
        history.push('/user/login');
      }
    },
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  const {response} = error;
  console.log('异常处理程序 response -> ', response)
  if (response && response.status) {
    /* const errorText = codeMessage[response.status] || response.statusText;
     const {status, url} = response;
 */
    /* notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    }); */
  }

  /* if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  } */
  throw error;
};


// 全局请求拦截，设置请求头
const requestInterceptor: RequestInterceptor = (url: string, options: RequestOptionsInit) => {
  return {
    url,
    options: {
      ...options,
      headers: {
        token: getToken()!,
      },
    },
  };
};

// 全局响应拦截
const responseInterceptors = async (response: any) => {
  const data = await response.clone().json();
  // 401表示token失效
  if (data.code === 401) {
    message.warning(`账号失效，请重新登录`)
    return history.push('/user/login');
  }
  return response
};


export const request: RequestConfig = {
  errorHandler,
  requestInterceptors: [requestInterceptor],
  responseInterceptors: [responseInterceptors]
};
