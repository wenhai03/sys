import {getData} from '@/services/data'
import {unique, div, totalNum, transformData} from '@/utils/utils'


export default {
  namespace: 'data',
  state: {
    list: [],
    totalCount: '',
    totalPage: '',
    page: 1,
    pageSize: 10,
  },
  effects: {
    // eslint-disable-next-line no-empty-pattern
    * loadData({}: any, {call, put}: any) {
      const {data: {companyList, dataList, emailList, shipList, businessList}} = yield call(getData)

      // @ts-ignore
      // 船舶类型
      let shipType = Array.from(shipList.reduce((pre: any, cur: any) => pre.set(cur.type, (pre.get(cur.type) || 0) + 1), new Map)).map(([type, count]) => ({
        type,
        count
      }))

      /* const totalType = shipType.reduce((pre: any, cur: any) => {
        return pre + cur.count
      }, 0) */

      shipType = shipType.map( (item: any) => {
          return {...item, percent: div(item.count, totalNum(shipType))}
      })

      // @ts-ignore
      // 船舶国籍分布图
      let nationalType = Array.from(shipList.reduce((pre: any, cur: any) => pre.set(cur.shipNationality, (pre.get(cur.shipNationality) || 0) + 1), new Map)).map(([type, count]) => ({
        type,
        count
      }))

      if (nationalType.length > 30) {
        nationalType = nationalType.slice(0, 30)
      }

      console.log('nationalType -> ', nationalType)

       const obj = {hasEmail: {count: 0, type: '有船舶邮箱', }, noEmail: {count: 0, type: '无船舶邮箱'}}
       const obj2 = {hasEmail: {count: 0, type: '有客户邮箱'}, noEmail: {count: 0, type: '无客户邮箱'}}
       const obj3 = {hasEmail: {count: 0, type: '发送邮件'}, noEmail: {count: 0, type: '未发送邮件'}}
       const obj4 = {hasEmail: {count: 0, type: '发送邮件'}, noEmail: {count: 0, type: '未发送邮件'}}
      shipList.forEach((item: any) => {
        if (item.email === '') {
          obj.noEmail.count += 1
        }
        if (item.email) {
          obj.hasEmail.count += 1
        }
      })
      companyList.forEach((item: any) => {
        if (item.email === '') {
          obj2.noEmail.count += 1
        }
        if (item.email) {
          obj2.hasEmail.count += 1
        }
      })

      const t1 = totalNum(Object.values(obj))
      const t2 = totalNum(Object.values(obj2))

      const b1 = Object.values(obj).map( (item: any) => {
        return {...item, percent: div(item.count, t1, 1)}
      })
      const b2 = Object.values(obj2).map( (item: any) => {
        return {...item, percent: div(item.count, t2, 1)}
      })
      console.log('b1 -> ', b1)
      console.log('b2 -> ', b2)

      // type = 1 船舶邮件发送 0 客户邮件发送
      const shipSend = emailList.filter((item: any) => item.type === 1)
      const customer = emailList.filter((item: any) => item.type === 0)

      // type = 1 船舶商机占比 0 客户商机占比
      const triggerLen1 = businessList.filter((item: any) => item.type === 1).length
      const triggerLen0 = businessList.filter((item: any) => item.type === 0).length

      const c = unique(customer, 'receiveEmail')


      yield put({
        type: 'save',
        payload: {
          list: dataList,
          shipList,
          companyList,
          emailList,
          shipType, // 船舶类型
          nationalType, // 船舶国籍分布图
          shipMailbox: b1, // 船舶邮箱占比
          customerMailbox: b2, // 客户邮箱占比
          // 船舶邮件发送占比
          shipEmailSend: transformData([
            {type: '发送邮件', count: shipSend.length},
            {type: '未发生邮件', count: (shipList.length - shipSend.length)},
          ], 2),
          // 客户邮件发送占比
          customerEmailSend: transformData([
            {type: '发送邮件', count: c.length},
            {type: '未发生邮件', count: (companyList.length - c.length)},
            ], 2),
          // 船舶商机触发占比
          shipTrigger: transformData([
            {type: '发送邮件', count: triggerLen0},
            {type: '未发生邮件', count: (shipList.length - triggerLen0)},
          ], 2),
          // 客户商机触发占比
          customerTrigger: transformData([
            {type: '发送邮件', count: triggerLen1},
            {type: '未发生邮件', count: (companyList.length - triggerLen1)},
          ], 2)
        }
      })
    },
  },
  reducers: {
    save(state: any, {payload}: any) {
      return {...state, ...payload}
    }
  },
}
