import {getCompanyList, saveCompany, deleteCompany, updateCompany, importCompany, exportCompany} from '@/services/customer'
import {message, Modal} from "antd";
import ResultInfo from '@/components/Result'

export default {
  namespace: 'customer',
  state: {
    list: [],
    totalPage: '',
    totalCount: '',
    page: 1,
    pageSize: 10,
    limit: 10,
    connectShipList: [],
    current: {},
    showEdit: false,
    addVisible: false,
    showCollectNow: false,
    importVisible: false,
    imo: '',
    value: '',
    params: {},
    isEmail: false,
  },
  effects: {
    // eslint-disable-next-line no-empty-pattern
    *loadData({payload, callback}: any, {call, put}: any) {
      const {page: {currPage, list, pageSize, totalCount, totalPage}} = yield call(getCompanyList, payload)

      callback({list, totalCount})
      yield put({
        type: 'save',
        payload: {
          list,
          totalPage,
          totalCount,
          currPage,
          pageSize,
          addVisible: false,
          importVisible: false,
          value: '',
          isEmail: payload.isEmail || false
        }
      })
    },
    *insert({payload}: any, {call, put, select}: any) {
      const r = yield select(({customer}: any) => customer);
      const res = yield call(saveCompany, payload)
      if (res.msg === 'success' || res.code === 0) {
        message.success(`新增成功`);
        // 新增成功之后重新加载数据
        yield put({
          type: 'loadData',
          payload: {
            page: r.page,
            pageSize: r.pageSize,
            limit: r.limit,
          }
        })
      } else {
        message.warning(`${res.msg}`);
      }

    },
    *update({payload}: any, {call, select}: any) {
      const res =  yield call(updateCompany, payload)
      if (res.msg === 'success' || res.code === 0) {
        message.success(`更新成功`);
        return true
      } else {
        message.warning(`${res.msg}`);
      }
    },
    *del({payload, callback}: any, {call, select}: any) {
      const r = yield select(({customer}: any) => customer);

      const res = yield call(deleteCompany, payload)
      if (res.msg === 'success' || res.code === 0) {
        message.success(`删除成功`);
        callback()
      } else {
        message.warning(`${res.msg}`);
      }
    },

    *importCompany({payload}: any, {call}: any) {
      const res = yield call(importCompany, payload)
      return res
    },
    * exportCompany({payload}: any, {call, put}: any) {
      const res = yield call(exportCompany, payload)
      if (res.msg === 'success' || res.code === 0) {
        message.success(`${res.msg}`);
        /* yield put({
          type: 'loadData',
          payload: {}
        }) */
      } else {
        message.warning(`${res.msg}`);
      }

      return res
    },

  },
  reducers: {
    save(state: any, {payload}: any) {
      return {...state, ...payload}
    }
  },
}
