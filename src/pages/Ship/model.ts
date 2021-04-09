import {
  getShipList, saveShip, deleteShip, updateShip, downloadShipTemplate, importShip, exportShip,
  getEventList, saveEvent, updateEvent, deleteEvent, getEventInfo
} from '@/services/ship'
import {saveMonitor} from '@/services/monitor'
import {getCompanyNameList} from '@/services/customer'
import {message} from "antd";

export default {
  namespace: 'ship',
  state: {
    list: [],
    customerList: [],
    dynamicList: [],
    current: {},
    showEdit: false,
    addVisible: false,
    addMonitorVisible: false,
    showCollectNow: false,
    addShipDynamicVisible: false,
    importVisible: false,
    totalCount: '',
    totalPage: '',
    page: 1,
    pageSize: 10,
    isMonitor: '',
    imo: '',
    shipType: []
  },
  effects: {
    // eslint-disable-next-line no-empty-pattern
    * loadData({payload}: any, {call, put}: any) {
      const {page: {currPage, list, pageSize, totalCount, totalPage}, msg, code} = yield call(getShipList, payload)
      if (code === 500) {
        message.warning(`${msg}`)
        return
      }
      yield put({
        type: 'save',
        payload: {
          list,
          totalPage,
          totalCount,
          currPage,
          pageSize,
          addMonitorVisible: false,
          addVisible: false,
          importVisible: false,
          current: {},
        }
      })
    },
    * getCompanyNameList({payload}: any, {call, put}: any) {
      const {data} = yield call(getCompanyNameList, payload)
      yield put({
        type: 'save',
        payload: {
          customerList: data,
        }
      })
    },
    * insert({payload}: any, {call, put}: any) {
      const res = yield call(saveShip, payload)
      if (res.msg === 'success' || res.code === 0) {
        message.success(`新增成功`);
        // 新增成功之后重新加载数据
        yield put({
          type: 'loadData',
          payload: {
            page: 1,
            pageSize: 10,
            limit: 10,
            sort: 'false', sortValue: 'create_time',
          }
        })
      } else {
        message.warning(`${res.msg}`);
      }

    },
    * update({payload, callback}: any, {call}: any) {
      const res = yield call(updateShip, payload)
      if (res.msg === 'success' || res.code === 0) {
        message.success(`更新成功`);
        return true
      } else {
        message.warning(`${res.msg}`);
      }
    },
    * del({payload, callback}: any, {call}: any) {
      const res = yield call(deleteShip, payload)
      if (res.msg === 'success' || res.code === 0) {
        message.success(`删除成功`);
        callback()
      } else {
        message.warning(`${res.msg}`);
      }

    },
    * downloadShipTemplate({payload, callBack}: any, {call}: any) {
      const res = yield call(downloadShipTemplate, payload)
      callBack()
      if (res.msg === 'success' || res.code === 0) {
        message.success(`下载模板成功`);
        callBack()
      }
    },
    * importShip({payload}: any, {call, put}: any) {
      const res = yield call(importShip, payload)

      if (res.msg === 'success' || res.code === 0) {
        yield put({
          type: 'loadData',
          payload: {}
        })
      }
      return res


    },
    * exportShip({payload}: any, {call, put}: any) {
      const res = yield call(exportShip, payload)
      if (res.msg === 'success' || res.code === 0) {
        yield put({
          type: 'loadData',
          payload: {}
        })
      } else {
        // message.warning(`导出失败`);
      }

      return res

    },
    /*-----------*/
    // eslint-disable-next-line no-empty-pattern
    * getEventList({payload}: any, {call, put}: any) {
      const {page: {currPage, list, pageSize, totalCount, totalPage}} = yield call(getEventList, payload)
      yield put({
        type: 'save',
        payload: {
          dynamicList: list,
          totalPage,
          totalCount,
          currPage,
          pageSize,
          addShipDynamicVisible: false
        }
      })
    },
    * getEventInfo({payload}: any, {call, put}: any) {
      const {page: {currPage, list, pageSize, totalCount, totalPage}} = yield call(getEventInfo, payload)
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
    * saveEvent({payload}: any, {call}: any) {
      return yield call(saveEvent, payload)

    },
    * updateEvent({payload}: any, {call}: any) {
      const res =  yield call(updateEvent, payload)
      if (res.msg === 'success' || res.code === 0) {
        message.success(`操作成功`);
        return true
      } else {
        message.warning(`${res.msg}`);
      }
    },
    * deleteEvent({payload}: any, {call, put}: any) {
      const res = yield call(deleteEvent, payload)
      if (res.msg === 'success' || res.code === 0) {
        message.success(`删除成功`);
        yield put({
          type: 'getEventInfo',
          payload: {}
        })
      } else {
        message.success(`${res.msg}`);
      }

    },
    * saveMonitor({payload, callback}: any, {call}: any) {
      const res = yield call(saveMonitor, payload)

      callback(res)
    },
  },
  reducers: {
    save(state: any, {payload}: any) {
      return {...state, ...payload}
    }
  },
}
