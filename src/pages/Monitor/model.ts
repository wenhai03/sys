import {getMonitorList, saveMonitor, deleteMonitor, updateMonitor} from '@/services/monitor'
import {message} from "antd";
import { updateEmail } from '@/services/mail';

export default {
  namespace: 'monitor',
  state: {
    list: [],
    connectShipList: [],
    current: {},
    showEdit: false,
    addVisible: false,
    showCollectNow: false,
    imo: ''
  },
  effects: {
    // eslint-disable-next-line no-empty-pattern
    *loadData({payload}: any, {call, put}: any) {
      const {page: {currPage, list, pageSize, totalCount, totalPage}, msg, code} = yield call(getMonitorList, payload)
      yield put({
        type: 'save',
        payload: {
          list,
          totalPage,
          totalCount,
          currPage,
          pageSize,
        }
      })
    },
    *insert({payload}: any, {call}: any) {
      return yield call(saveMonitor, payload)
      // 新增成功之后重新加载数据
      /* yield put({
        type: 'loadData',
        payload: {
          addVisible: false,
        }
      }) */
    },

    *del({payload, callback}: any, {call}: any) {
      const res = yield call(deleteMonitor, payload)

      callback(res)
      /*if (res.msg === 'success' || res.code === 0) {
        message.success(`操作成功`);
        callback()
      }else {
        message.warning(`${res.msg}`);
      }*/

    },
    *updateMonitor({payload, callback}: any, {call}: any) {
      const {id, ...params} = payload
      const res = yield call(updateMonitor, id, params)

      if (res.msg === 'success' || res.code === 0) {
        message.success(`操作成功`);
        callback()
      }else {
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
