import {getEmailLogList, getTaskLogList, getFailLogList} from '@/services/log'
import {getEmailInfo} from '@/services/mail'
import { message } from 'antd';

export default {
  namespace: 'log',
  state: {
    list: [],
    emailLogList: [],
    taskLogList: [],
    current: {},
    page: 1,
    pageSize: 10,
    limit: 10,
    showEdit: false,
    addVisible: false,
    showCollectNow: false,
    imo: ''
  },
  effects: {
    // eslint-disable-next-line no-empty-pattern
    *getEmailLogList({payload}: any, {call, put}: any) {
      const {page: {currPage, list, pageSize, totalCount, totalPage}} = yield call(getEmailLogList, payload)
      yield put({
        type: 'save',
        payload: {
          emailLogList: list,
          totalPage,
          totalCount,
          currPage,
          pageSize,
        }
      })
    },
    *getTaskLogList({payload}: any, {call, put}: any) {
      const {page: {currPage, list, pageSize, totalCount, totalPage}} = yield call(getTaskLogList, payload)
      yield put({
        type: 'save',
        payload: {
          taskLogList: list,
          totalPage,
          totalCount,
          currPage,
          pageSize,
        }
      })
    },
    *getEmailInfo({payload}: any, {call}: any) {
      const res = yield call(getEmailInfo, payload)
      return res

    },
    *getFailLogList({payload, callback}: any, {call}: any) {
      const res = yield call(getFailLogList, payload)
      if (res.msg === 'success' || res.code === 0) {
        callback(res.page)
      } else {
        message.warning(`${res.msg}`);
      }
    },
  },
  reducers: {
    save(state: any, {payload}: any) {
      return {...state, ...payload}
    }
  },
}
