import React, {useEffect, useState} from 'react'
import {PageContainer} from '@ant-design/pro-layout'

import {Button, Tooltip, Table} from 'antd'
import FormSearch from '@/components/FormSearch';
import FormBuilder from '@/components/FormBuilder';

import {connect, ConnectProps} from "umi";
import DatePickerTime from "@/components/DatePickerTime";
import Search from "@/components/Search";
import { history } from '@@/core/history';

interface PageProps extends ConnectProps {
  taskLogList: any,
  totalCount: any,
  totalPage: any,
  page: any,
  pageSize: any,
  limit: any,
}

const Operate: React.FC<PageProps> = (props) => {
  const {dispatch, taskLogList, totalCount, } = props

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [limit, setLimit] = useState(10);
  const [params, setParams] = useState({});

  useEffect(() => {
    dispatch!({
      type: 'log/getTaskLogList',
      payload: {
        page,
        pageSize,
        limit,
        ...params
      }
    })
  }, [page, pageSize, limit, params])

  const columns = [
    { title: '序号', dataIndex: 'id', },
    {
      title: '类型',
      dataIndex: 'type', // 0 采集   1 监控  2 发邮件
      render: (index: any) => {
        const obj = {
          0: {text: '采集船舶数据', status: 'success'},
          1: {text: '监控船舶动态', status: 'error'},
          2: {text: '发送营销邮件', status: 'error'},
        }
        return obj[index].text
      },
    },
    { title: '请求次数', dataIndex: 'total', },
    { title: '成功数量', dataIndex: 'success', },
    {
      title: '失败数量',
      dataIndex: 'fail',
      render: (index: any, item: any) => {
        return (
        <Tooltip placement="topLeft" title="查看失败数量">
          <Button type="link" onClick={() => {
            console.log('item -> ', item)
            history.push({
              pathname: '/log/operate/operateFail' , query: {type: item.type}
            });
          }}>{index}</Button>
        </Tooltip>
        )
      },
    },
    { title: '执行时间', dataIndex: 'startTime', },
  ];

  const onChange = (pageIndex: number, size: number) => {
    setPage(pageIndex)
    setParams(() => ({...params, page: pageIndex}))
    setPageSize(size)
    setLimit(size)
  }


  return (
    <PageContainer>
      <div className="content_wrapper">
          <Search
            start_time
            value={false}
            status=""
            onSearch={(data: any) => {
              setParams({...data, page: 1})

            }}
            resetSearch={() => {
              setPage(1)
              setPageSize(10)
              setLimit(10)
              setParams({})
            }}
          />
          <div className="table_wrapper">
            <Table
              sticky
              size="small"
              scroll={{scrollToFirstRowOnChange: true, x: true}}
              rowKey={(record: any) => record.id || 'id'}
              columns={columns}
              dataSource={taskLogList}
              pagination={{
                current: page,
                total: totalCount,
                showSizeChanger: true,
                showQuickJumper: true,
                onChange,
                showTotal: (total) => `总数 ${total} 条`
              }}
            />
          </div>
      </div>
    </PageContainer>
  )
}

export default connect((state: any) => {
  const {log: {taskLogList, totalPage, totalCount, page, pageSize, limit}} = state
  return {
    taskLogList,
    totalPage,
    totalCount,
    page,
    pageSize,
    limit,
  }
})(Operate)

