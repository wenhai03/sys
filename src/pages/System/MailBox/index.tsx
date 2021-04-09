import React, {useEffect, useState} from 'react'
import {PageContainer} from '@ant-design/pro-layout'
import {connect, ConnectProps} from 'umi'
import {Button, Card, Input, Divider, Table, Modal} from 'antd'
import {ExclamationCircleOutlined} from "@ant-design/icons";
import moment from "moment";
import AddForm from './components/AddForm'

const {confirm} = Modal

interface PageProps extends ConnectProps {
  emailAccountList: any,
  totalCount: any,
  totalPage: any,
  page: any,
  pageSize: any,
}

const MailBox: React.FC<PageProps> = (props) => {
  const {dispatch, emailAccountList, totalCount,} = props


  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [limit, setLimit] = useState(10);
  const [params,] = useState({});

  useEffect(() => {
    dispatch!({
      type: 'system/getEmailAccountList',
      payload: {
        page,
        pageSize,
        limit,
        ...params,
      }
    })
  }, [page, pageSize, limit])


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '邮箱账号',
      dataIndex: 'account',
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (index: any) => {
        const obj = {
          0: {text: '营销', status: 'success'},
          1: {text: '伙食', status: 'error'},
        }
        return obj[index].text
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
    },
    {
      title: '操作',
      fixed: 'right',
      width: 180,
      align: 'center',
      render: ({id, type, pwd, account}: any) => (
        <>
          <a onClick={() => {
            dispatch!({
              type: 'system/save',
              payload: {
                addEmailVisible: true,
                emailItemInfo: {id, type, pwd, account}
              }
            })
          }}>编辑</a>
          <Divider type="vertical"/>
          <a onClick={() => {
            confirm({
              title: '删除邮件模板',
              icon: <ExclamationCircleOutlined/>,
              content: '确认删除该邮件模板吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: () => {
                dispatch!({
                  type: 'system/deleteEmailAccount',
                  payload: id
                })
              }
            });
          }}>删除</a>
        </>
      ),
    },
  ];

  const onChange = (pageIndex: number, size: number) => {
    setPage(pageIndex)
    setParams(() => ({...params, page: pageIndex}))
    setPageSize(size)
    setLimit(size)
  }

  return (
    <PageContainer
      extra={<Button onClick={() => {
        dispatch!({
          type: 'system/save',
          payload: {
            addEmailVisible: true,
            emailItemInfo: {}
          }
        })
      }} type="primary">新增邮箱</Button>}
    >
      <Card>
        <Table
          rowKey={(record: any) => record.id || 'id'}
          columns={columns}
          dataSource={emailAccountList}
          pagination={{
            total: totalCount,
            showSizeChanger: true,
            onChange,
            showTotal: (total) => `总数 ${total} 条`
          }}
        />

        <AddForm />
      </Card>
    </PageContainer>
  )
}

export default connect((state: any) => {
  const {system: {emailAccountList, totalPage, totalCount, page, pageSize}} = state
  return {
    emailAccountList,
    totalPage,
    totalCount,
    page,
    pageSize,
  }
})(MailBox)
