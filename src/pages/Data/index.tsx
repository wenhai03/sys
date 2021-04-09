import React, {useEffect, useState} from 'react'
import {PageContainer} from '@ant-design/pro-layout'

import {Card, Table} from 'antd'
import {connect, ConnectProps} from "umi";
import ShipType from './components/ShipType'
import ShipEmail from './components/ShipEmailBox'
import ShipTrigger from './components/ShipTrigger'
import CustomerEmail from './components/CustomerEmail'
import ShipSendEmail from './components/ShipEmailSend'
import CustomerSendEmail from './components/CustomerEmailSend'
import CustomerTrigger from './components/CustomerTrigger'

import ShipColumnar from './components/ShipColumnar'

interface PageProps extends ConnectProps{
  list: any,
  totalCount: any,
  totalPage: any,
  page: any,
  pageSize: any,
  limit: any,
}

const Data: React.FC<PageProps> = (props) => {
  const {dispatch, list, totalCount} = props

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    dispatch!({
      type: 'data/loadData',
      payload: {
        page,
        pageSize,
        limit
      }
    })
  }, [page, pageSize])

  const columns = [
    {title: '日期', dataIndex: 'date',},
    {title: '船舶总数', dataIndex: 'shipCount',},
    {title: '新增船舶', dataIndex: 'addShip',},
    {title: '累计客户', dataIndex: 'companyCount',},
    {title: '新增客户', dataIndex: 'addCompany',},
    {title: '累计回国船舶次数', dataIndex: 'backCount',},
    {title: '今日新增回国船舶', dataIndex: 'addBack',},
  ];

  const onChange = (pageIndex: number, size: number) => {
    setPage(pageIndex)
    setPageSize(size)
    setLimit(size)
  }

  // @ts-ignore
  return (
    <PageContainer>
        <Card>
        <Table
          rowKey={(record: any) => record.id || 'id'}
          // pagination={{
          //   current: page,
          //   total: totalCount,
          //   showSizeChanger: true,
          //   onChange,
          //   showTotal: (total) => `总数 ${total} 条`
          // }}
          pagination={false}
          columns={columns}
          dataSource={list}
        />
      </Card>
      <Card title="船舶国籍分布图">
        <ShipColumnar/>
      </Card>

      <Card title="船舶类型">
        <ShipType/>
      </Card>

       <Card title="船舶邮箱占比">
        <ShipEmail />
      </Card>
      <Card title="客户邮箱占比">
        <CustomerEmail/>
      </Card>

       <Card title="船舶邮件发送占比">
        <ShipSendEmail/>
      </Card>
      <Card title="客户邮件发送占比">
        <CustomerSendEmail/>
      </Card>

      <Card title="船舶商机触发占比">
        <ShipTrigger/>
      </Card>
      <Card title="客户商机触发占比">
        <CustomerTrigger/>
      </Card>

    </PageContainer>
  )
}

export default connect((state: any) => {
  const {data: {list, totalPage, totalCount, page, pageSize}} = state
  return {
    list,
    totalPage,
    totalCount,
    page,
    pageSize,
  }
})(Data)
