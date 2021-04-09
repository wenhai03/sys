import React, {useEffect, useState} from 'react'
import {connect, ConnectProps} from 'umi'
import {PageContainer} from '@ant-design/pro-layout'
import {Button, Table, Input, Divider, Badge, Modal} from 'antd'
import {ExclamationCircleOutlined} from "@ant-design/icons";
import DeleteButton from '@/components/DeleteButton'
import AddForm from './components/AddForm'

const {confirm} = Modal


interface PageProps extends ConnectProps {
  accountList: any,
  totalCount: any,
  totalPage: any,
  page: any,
  pageSize: any,
}

const Index: React.FC<PageProps> = (props) => {
  const {dispatch, accountList, totalCount} = props

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    dispatch!({
      type: 'system/loadAccountData',
      payload: {
        page,
        pageSize,
        limit
      }
    })
  }, [page, pageSize, limit])

  const columns = [
    {
      title: '用户名ID',
      dataIndex: 'userId',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
     {
      title: '角色',
      dataIndex: 'role',
       render: (index: any) => {
         const obj = {
           0: {text: '超级管理员', status: 'success'},
           1: {text: '普通管理员', status: 'warning'},
         }
         const {text, status} = obj[index]
         return <Badge status={status} text={text}/>
       },
    },
    /* {
      title: '状态',
      dataIndex: 'isDelete',
      render: (index: any) => {
        const obj = {
          0: {text: '正常', status: 'success'},
          1: {text: '已删除', status: 'error'},
        }
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const {text, status} = obj[index]
        return <Badge status={status} text={text}/>
      },

    }, */
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
      align: 'center',
      render: ({userId, isDelete}: any) => (
        <>
          {
            isDelete === 0 && <>
              <a onClick={() => {
                dispatch!({
                  type: 'system/save',
                  payload: {
                    addAccountVisible: true,
                    isEdit: true,
                    userId
                  }
                })
              }}>修改密码</a>
              <Divider type="vertical"/>
              <DeleteButton onOk={() => {
                dispatch!({
                  type: 'system/delUser',
                  payload: userId
                })
              }} />
            </>
          }
        </>
      ),
    },
  ];

  const onChange = (pageIndex: number, size: number) => {
    setPage(pageIndex)
    setPageSize(size)
    setLimit(size)
  }

  return (
    <PageContainer
      extra={
        <>
          <Button onClick={() => {
            dispatch!({
              type: 'system/save',
              payload: {
                addAccountVisible: true,
                isEdit: false,
                userId: ''
              }
            })
          }} type="primary">新增账号</Button>
        </>
      }
    >

      <Table
        rowKey={(record: any) => record.userId || 'id'}
        columns={columns}
        dataSource={accountList}
        pagination={{
          current: page,
          total: totalCount,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange,
          showTotal: (total) => `总数 ${total} 条`
        }}
      />

      <AddForm />
    </PageContainer>
  )
}

export default connect((state: any) => {

  const {system: {accountList, totalPage, totalCount, page, pageSize}} = state
  return {
    accountList,
    totalPage,
    totalCount,
    page,
    pageSize,
  }
})(Index)

