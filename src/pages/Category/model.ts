import {loadMovieCategories, updateOne, saveOne, delOne} from '@/services/movie-categories'
export default {
  namespace: 'movieCategory',
  state: {
    list: [],
    current: {},
    showEdit: false,
    isEdit: false,
  },
  effects: {
    // eslint-disable-next-line no-empty-pattern
    *loadData({}: any, {call, put}: any) {
      const res = yield call(loadMovieCategories)

      yield put({
        type: 'save',
        payload: {
          list: res,
          showEdit: false,
          isEdit: false
        }
      })
    },
    *insert({payload}: any, {call, put}: any) {
      yield call(saveOne, payload)
      // 新增成功之后重新加载数据
      yield put({
        type: 'loadData',
        payload: {}
      })
    },
    *update({payload}: any, {call, put}: any) {
      yield call(updateOne, payload.id, payload.data)
      yield put({
        type: 'loadData',
        payload: {}
      })
    },
    *del({payload}: any, {call, put}: any) {
      yield call(delOne, payload)
      yield put({
        type: 'loadData',
        payload: {}
      })
    }
  },
  reducers: {
    save(state: any, {payload}: any) {
      return {...state, ...payload}
    }
  },
}
