import {parse} from 'querystring';
import BigNumber from "bignumber.js";


/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const {NODE_ENV} = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => {
  const {href} = window.location;
  const qsIndex = href.indexOf('?');
  const sharpIndex = href.indexOf('#');

  if (qsIndex !== -1) {
    if (qsIndex > sharpIndex) {
      return parse(href.split('?')[1]);
    }

    return parse(href.slice(qsIndex + 1, sharpIndex));
  }

  return {};
};


// export const serverUrl = 'http://192.168.16.26:8081/ship'
// export const serverUrl = 'http://111.230.141.63:8080/ship'
export const serverUrl = 'http://192.168.254.205:8080/ship'

export function setToken(token: string) {
  localStorage.setItem('token', token)
}

export function setUserName(username: string) {
  localStorage.setItem('username', JSON.stringify(username))
}

export function getToken() {
  return localStorage.getItem('token') || ''
}

export function getUserName() {
  return localStorage.getItem('username') || 'admin'
}

// 处理项目中的图片地址
export const resetImgUrl = (url: string) => {
  return url.startsWith('http') ? url : serverUrl + url
}

export function setCookie(name: any, value: any) {
  const Days = 30;
  const exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()}`;
}

export function setFileName(str: string) {
  if (str.includes(',')) {
    let r = ''
    const s = str.split(',')
    s.forEach(v => {
      const name = v.substring(v.lastIndexOf("\\") + 1);
      r = `${r + name}\n`
    })
    return r
  }
  if (str.includes('/')) {
    return str.substring(str.lastIndexOf("/") + 1)
  }
  if (str.includes("\\")) {
    return str.substring(str.lastIndexOf("\\") + 1)
  }
}

export function getCookie(name: any) {
  let arr;
  // eslint-disable-next-line no-shadow
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  // eslint-disable-next-line no-cond-assign
  if (arr === document.cookie.match(reg)) {
    return unescape(arr[2])
  }
  ;
  return null;
}

// 数组对象去重，传入arr和要去重的key值
export function unique(arr: any, key: string) {
  const map = new Map()
  return arr.filter((item: { [x: string]: string; }) => !map.has(`${item[key]}`) && map.set(`${item[key]}`, 1))
}

export function debounce(fun:any, delay:any){
  let timer: any
  return  (args: any) => {
    clearTimeout(timer)
    timer = setTimeout( () => {
      fun(args)
    }, delay)
  }
}

export function div (a: any, b: any, decimalPlaces=3) { // 除法
  const prevNum = new BigNumber(a)
  const currentNum = new BigNumber(b)
  const value = prevNum.div(currentNum)
  return value.multipliedBy(100).toFixed(decimalPlaces)
}

export function totalNum (arr: any) { // 除法
  return arr.reduce((pre: any, cur: any) => {
    return pre + cur.count
  }, 0)
}

export function transformData (arr: any, decimalPlaces=3) { // 除法
  const total = totalNum(arr)
  return arr.map( (item: any) => {
    return {...item, percent: div(item.count, total, decimalPlaces)}
  })
}
