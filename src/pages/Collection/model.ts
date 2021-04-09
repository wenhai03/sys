import {getImoList, saveImo, importImo, deleteImo, collectNow} from '@/services/collection'
import {message} from "antd";

export default {
  namespace: 'collection',
  state: {
    list: [],
    totalPage: '',
    totalCount: '',
    page: 1,
    pageSize: 10,
    limit: 10,
    showEdit: false,
    showAddImo: false,
    showCollectNow: false,
    importVisible: false,
    imo: ''
  },
  effects: {
    // eslint-disable-next-line no-empty-pattern
    * loadData({payload}: any, {call, put}: any) {
      const {page: {list, totalCount, totalPage}} = yield call(getImoList, payload)
      yield put({
        type: 'save',
        payload: {
          list,
          totalPage,
          totalCount,
          showAddImo: false,
          showCollectNow: false,
          importVisible: false,
        }
      })
    },
    * insert({payload}: any, {call, put}: any) {
      const res = yield call(saveImo, payload)
      if (res.msg === 'success' || res.code === 0) {
        message.success(`新增成功`);
        // 新增成功之后重新加载数据
        yield put({
          type: 'loadData',
          payload: {
            showAddImo: false,
          }
        })
      } else {
        message.warning(`${res.msg}`);
      }

    },
    * update({payload}: any, {call, put}: any) {
      yield call(importImo, payload.id, payload.data)
      yield put({
        type: 'loadData',
        payload: {}
      })
    },
    * del({payload, callback}: any, {call}: any) {
      const res = yield call(deleteImo, payload)
      if (res.msg === 'success' || res.code === 0) {
        message.success(`删除成功`);
        callback()
      } else {
        message.warning(`${res.msg}`);
      }

    },
    * importImo({payload}: any, {call, put}: any) {
      const res = yield call(importImo, payload)
      if (res.msg === 'success' || res.code === 0) {
        message.success(`导入成功`);
        yield put({
          type: 'loadData',
          payload: {}
        })
      } else {
        message.warning(`${res.msg}`);
      }

    },
    * collectNow({payload, callback}: any, {call}: any) {
      const res = yield call(collectNow, payload)
      if (res.msg === 'success' || res.code === 0) {
        message.success(`采集成功`);
        callback()
      } else {
        callback()
        message.warning(`${res.msg}`);
      }

    }
  },
  reducers: {
    save(state: any, {payload}: any) {
      return {...state, ...payload}
    }
  },
}
