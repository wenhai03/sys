import {getEmailList, saveEmail, deleteEmail, updateEmail, uploadImage, getEmailInfo, getSendEmailInfo, getSendEmailList, updateSendEmail, deleteSendEmail, sendEmail} from '@/services/mail'
import {message} from "antd";

export default {
  namespace: 'mail',
  state: {
    list: [],
    connectShipList: [],
    current: {},
    showEdit: false,
    addVisible: false,
    showCollectNow: false,
  },
  effects: {
    // eslint-disable-next-line no-empty-pattern
    *loadData({payload}: any, {call, put}: any) {
      const {page: {currPage, list, pageSize, totalCount, totalPage}} = yield call(getEmailList, payload)
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
      return yield call(saveEmail, payload)
    },
    *getEmailInfo({payload}: any, {call}: any) {
      return yield call(getEmailInfo, payload)
    },
    *update({payload}: any, {call}: any) {
      const {id, ...params} = payload
      return yield call(updateEmail, id, params)
    },
    *del({payload, callback}: any, {call}: any) {
      const res = yield call(deleteEmail, payload)
      if (res.msg === 'success' || res.code === 0) {
        message.success(`删除成功`);
        callback()
      }else {
        message.warning(`${res.msg}`);
      }
    },
    *uploadImage({payload, callback}: any, {call}: any) {
      const res = yield call(uploadImage, payload)
      if (res.msg === 'success' || res.code === 0) {
        message.success(`上传成功`);
        callback(res.url)
      }
    },

    *getSendEmailList({payload, callback}: any, {call}: any) {
      const {code, msg, page: {currPage, list, pageSize, totalCount, totalPage}} = yield call(getSendEmailList, payload)
      console.log('getSendEmailList list -> ', list)
      if (msg === 'success' || code === 0) {
        callback(list, totalCount, totalPage)
      }
    },
    *getSendEmailInfo({payload, callback}: any, {call}: any) {
      const res = yield call(getSendEmailInfo, payload)
      if (res.msg === 'success' || res.code === 0) {
        callback(res.Email)
      }else {
        message.warning(`${res.msg}`);
      }
    },
    *updateSendEmail({payload}: any, {call}: any) {
      const {id, ...params} = payload
      return yield call(updateSendEmail, id, params)
    },
    *deleteSendEmail({payload, callback}: any, {call}: any) {
      const res = yield call(deleteSendEmail, payload)
      if (res.msg === 'success' || res.code === 0) {
        callback()
        message.success(`删除成功`);
      }else {
        message.warning(`${res.msg}`);
      }
    },
    *sendEmail({payload, callback}: any, {call}: any) {
      return yield call(sendEmail, payload)
    },
  },
  reducers: {
    save(state: any, {payload}: any) {
      return {...state, ...payload}
    }
  },
}
