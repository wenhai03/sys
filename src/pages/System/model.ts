import {
  loadSysParamsData, updateSysParams, addConfig, delConfig, setMonitorRateConfig,
  loadAccountData, delUser, updatePwd, addAccount,
  getEmailAccountList, saveEmailAccount, deleteEmailAccount, uploadEmailAccount
} from '@/services/system'
import {message} from "antd";
import {history} from 'umi';

export default {
  namespace: 'system',
  state: {
    collectModel: {},
    monitorModel: {},
    collectData: [],
    list: [],
    accountList: [],
    emailAccountList: [],
    monitorFrequencyList: [],
    frequencyItemInfo: {},
    totalPage: '',
    totalCount: '',
    page: 1,
    pageSize: 10,
    current: {},
    emailItemInfo: {},
    addVisible: false,
    addAccountVisible: false,
    addEmailVisible: false,
    isEdit: false,
    userId: ''
  },
  effects: {
    // eslint-disable-next-line no-empty-pattern
    * loadSysParamsData({payload}: any, {call, put}: any) {
      const {list} = yield call(loadSysParamsData, payload)
      const collectModel = {};
      const monitorModel = {};
      const systemParamsModel = {}
      const autoEmailModel = {}
      const frequencyList: { paramKey: any; paramValue1: any, paramValue: any; type: any; id: any; }[] = []

      if (list.length > 0) {
        // @ts-ignore
        list.forEach(({paramKey, paramValue, paramValue1, type, id}) => {
          if (type === 1) {
            collectModel[paramKey] = paramValue
          }
          if (type === 2) {
            monitorModel[paramKey] = paramValue
          }
          if (type === 3) {
            systemParamsModel[paramKey] = paramValue
          }
          if (type === 4) {
            autoEmailModel[paramKey] = paramValue
          }
          if (type === 5) {
            frequencyList.push({
              paramKey, paramValue, paramValue1, type, id
            })
          }
        })
      }
      console.log('monitorModel -> ', monitorModel)

      yield put({
        type: 'save',
        payload: {
          monitorList: [],
          monitorFrequencyList: frequencyList,
          collectModel,
          monitorModel,
          autoEmailModel,
          systemParamsModel,
          addVisible: false,
          isEdit: false
        }
      })
    },
    * updateSysParams({payload}: any, {call, put}: any) {
      const res = yield call(updateSysParams, payload)
      if (res.msg === 'success' || res.code === 0) {
        message.success(`保存成功`)
        yield put({
          type: 'loadSysParamsData',
          payload: {}
        })
      } else {
        message.warning(`${res.msg}`)
      }

      return res
    },
    * setMonitorRateConfig({payload}: any, {call, put}: any) {
      const res = yield call(setMonitorRateConfig, payload)
      if (res.msg === 'success' || res.code === 0) {
        yield put({
          type: 'loadSysParamsData',
          payload: {}
        })
      }

      return res
    },
    * insert({payload}: any, {call, put}: any) {
      const res = yield call(addConfig, payload)
      if (res.msg === 'success' || res.code === 0) {
        yield put({
          type: 'loadSysParamsData',
          payload: {
            addVisible: false,
            addMonitorVisible: false,
          }
        })
      }
      return res
    },
    * del({payload}: any, {call, put}: any) {
      const res = yield call(delConfig, payload)
      if (res.msg === 'success' || res.code === 0) {
        message.success(`删除成功`);
        yield put({
          type: 'loadSysParamsData',
          payload: {}
        })
      } else {
        message.warning(`${res.msg}`)
      }

    },
    /*-----------*/
    // eslint-disable-next-line no-empty-pattern
    * loadAccountData({payload}: any, {call, put}: any) {
      const {page: {list, totalCount, totalPage}} = yield call(loadAccountData, payload)
      const collectModel = {};
      const monitorModel = {};
      const systemParamsModel = {}

      if (list.length > 0) {
        // @ts-ignore
        list.forEach(({paramKey, paramValue, type}) => {
          if (type === 1) {
            collectModel[paramKey] = paramValue
          }
          if (type === 2) {
            monitorModel[paramKey] = paramValue
          }
          if (type === 3) {
            systemParamsModel[paramKey] = paramValue
          }
        })
      }

      yield put({
        type: 'save',
        payload: {
          accountList: list,
          collectModel,
          monitorModel,
          systemParamsModel,
          addAccountVisible: false,
          totalCount,
          totalPage,
          isEdit: false
        }
      })
    },
    * addAccount({payload}: any, {call, put}: any) {
      const res = yield call(addAccount, payload)
      if (res.msg === 'success' || res.code === 0) {
        message.success(`新增成功`);
        // 新增成功之后重新加载数据
        yield put({
          type: 'loadAccountData',
          payload: {
            addVisible: false,
            addMonitorVisible: false,
          }
        })
      }else {
        message.warning(`${res.msg}`);
      }

    },
    * updatePwd({payload}: any, {call}: any) {
      const res = yield call(updatePwd, payload)
      if (res.msg === 'success' || res.code === 0) {
        message.success(`修改密码成功，请重新登录`);
        history.push('/user/login');
      }else {
        message.warning(`${res.msg}`);
      }

    },
    * delUser({payload}: any, {call, put}: any) {
      const res = yield call(delUser, payload)
      if (res.msg === 'success' || res.code === 0) {
        message.success(`删除成功`);
        yield put({
          type: 'loadAccountData',
          payload: {}
        })
      }else {
        message.warning(`${res.msg}`);
      }

    },
    /*---------------*/
    *getEmailAccountList({payload, callback}: any, {call, put}: any) {
      const {page: {currPage, list, pageSize, totalCount, totalPage}} = yield call(getEmailAccountList, payload)
      yield put({
        type: 'save',
        payload: {
          emailAccountList: list,
          totalPage,
          totalCount,
          currPage,
          pageSize,
        }
      })
      if (callback) {
        callback(list)
      }
    },
    *saveEmailAccount({payload}: any, {call, put}: any) {
      const res = yield call(saveEmailAccount, payload)
      yield put({
        type: 'getEmailAccountList',
        payload: {}
      })
      return res
    },
    *uploadEmailAccount({payload}: any, {call, put}: any) {
      const {id, ...params} = payload
      const res = yield call(uploadEmailAccount, id, params)

      yield put({
        type: 'getEmailAccountList',
        payload: {}
      })

      return res
    },
    *deleteEmailAccount({payload}: any, {call, put}: any) {
      const res = yield call(deleteEmailAccount, payload)
      if (res.msg === 'success' || res.code === 0) {
        message.success(`删除成功`);
        yield put({
          type: 'getEmailAccountList',
          payload: {}
        })
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
