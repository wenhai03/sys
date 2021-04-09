import React, { useEffect, useState } from 'react';
import {PageContainer} from '@ant-design/pro-layout'

import {Button, Divider, Table, Tooltip, message, Row, Col, Space} from 'antd'
import DeleteButton from '@/components/DeleteButton';
import Search from './components/Search';
import FileExport from '@/components/FileExport';
import BatchImport from '@/components/BatchImport';

import {connect, ConnectProps} from "umi";
import AddForm from './components/AddForm';
import EllipsisTooltip from '@/components/EllipsisTooltip';

interface PageProps extends ConnectProps {
  value: any,
  isEmail: any,
}

const Customer: React.FC<PageProps> = (props) => {
  const {dispatch} = props
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(+props.location.query.page|| 1);
  const [pageSize, setPageSize] = useState(+props.location.query.pageSize || 10);
  const [limit, setLimit] = useState(+props.location.query.pageSize || 10);
  const [params, setParams] = useState(props.location.query.params || {});
  const [searchValue, setSearchValue] = useState(props.location.query.searchValue || '');
  const [name, setName] = useState(props.location.query.name || 'name');

  const fetchData = () => {
    let payload = {
      page,
      pageSize,
      limit,
    }
    if (name && searchValue) {
      payload = {
        ...payload,
        [name]: searchValue
      }
    } else {
      payload = {
        ...payload,
        ...params
      }
    }

    dispatch!({
      type: 'customer/loadData',
      payload,
      callback: ({ list, totalCount } ) => {
        setDataSource(list)
        setTotalCount(totalCount)
      }
    })
  }
  useEffect(() => {
    fetchData()
  }, [page, pageSize, limit, params])

  const columns = [
    {title: '客户名称', dataIndex: 'name', width: 250, render: (text: any) => <EllipsisTooltip title={text}> {text} </EllipsisTooltip>},
    {title: '英文名称', dataIndex: 'enName', width: 150, render: (text: any) => <EllipsisTooltip title={text}> {text} </EllipsisTooltip>},
    {title: '联系电话', dataIndex: 'telephone',},
    {
      title: '地址',
      dataIndex: 'address',
      ellipsis: {
        showTitle: false,
      },
      render: (address: any) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: '网址',
      dataIndex: 'url',
      ellipsis: {
        showTitle: false,
      },
      render: (url: any) => (
        <Tooltip placement="topLeft" title={url}>
          {url}
        </Tooltip>
      ),
    },
    {title: '邮箱', dataIndex: 'email', width: 180, render: (text: any) => <EllipsisTooltip title={text}> {text} </EllipsisTooltip>},
    {title: '创建时间', dataIndex: 'createTime',},
    {title: '更新时间', dataIndex: 'updateTime',},
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      width: '180px',
      dataIndex: 'createTime',
      render: (i: any, current: any) => (
        <>
          <a
            onClick={() => {
              // console.log('page -> ', page)
              // @ts-ignore
              props.history.push({
                pathname: '/ship',
                query: {
                  company: current.name,
                  page,
                  pageSize,
                  params
                }
              })
            }}
          >
            关联船舶
          </a>
          <Divider type="vertical"/>
          <a
            onClick={() => {
              dispatch!({
                type: 'customer/save',
                payload: {
                  addVisible: true,
                  current
                }
              })
            }}
          >
            编辑
          </a>
          <Divider type="vertical"/>
          <DeleteButton onOk={() => {
            dispatch!({
                type: 'customer/del',
                payload: [current.id],
                callback: () => {
                  fetchData()
                }
              }
            )
          }}/>
        </>
      ),
    },
  ];

  const onChange = (pageIndex: number, size: number) => {
    setPage(pageIndex)
    setParams(() => ({...params, page: pageIndex}))
    setPageSize(size)
    setLimit(size)
    // @ts-ignore
    props.history.push({
      pathname: 'customer',
      query: {
        page: pageIndex,
        pageSize: size
      }
    })
  }

  const rowSelection = {
    preserveSelectedRowKeys: true, // 翻页时候全选状态还能保留住
    onChange: (selectedKeys: any) => {
      setSelectedRowKeys(selectedKeys)
    },
    onSelect: (record: any, selected: any, selectedRows: any) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
      console.log(selected, selectedRows, changeRows);
    },
    selectedRowKeys
  };

  // @ts-ignore
  return (
    <PageContainer
      extra={
        <Row>
          <Space>
            <Col>
              <Button onClick={() => {
                dispatch!({
                  type: 'customer/save',
                  payload: {
                    addVisible: true,
                  }
                })
              }} type="primary">添加客户</Button>
            </Col>
            <Col>
              <BatchImport
                apiUrl="importCompany"
                templateUrl="downloadCompanyTemplate"
                onOk={() => {
                  dispatch!({
                    type: 'customer/loadData',
                    payload: {
                      page: 1,
                      pageSize: 10,
                      isEmail: false,
                      limit: 10
                    }
                  })
                }}/>
            </Col>
            <Col>
              <FileExport
                hasList={dataSource}
                selectedRowKeys={selectedRowKeys}
                url="exportCompany"
                filename="客户信息表.xls"
                callBack={() => setSelectedRowKeys([])}
              />
            </Col>
            <Col>
              <DeleteButton
                type="primary"
                size="middle"
                tag="button"
                text="批量删除"
                contentTxt="是否批量删除 ？"
                beforeDel={() => {
                  if (!dataSource.length) {
                    message.warning(`暂无数据`)
                    return false
                  }

                  if (!selectedRowKeys.length) {
                    message.warning(`请选择要删除的数据`)
                    return false
                  }

                  return !!dataSource.length
                }}
                onOk={() => {
                  dispatch!({
                      type: 'customer/del',
                      payload: selectedRowKeys,
                      callback: () => {
                        fetchData()
                      }
                    }
                  )
                }}
                onCancel={() => setSelectedRowKeys([])}
              />
            </Col>

            <Col>
              <FileExport
                isAll
                selectedRowKeys={[]}
                text="全部"
                hasList={dataSource}
                url="exportCompany"
                filename="客户信息表.xls"
              />
            </Col>
          </Space>

        </Row>
      }
    >
      <div className="content_wrapper">
        <Search
          needSelect={[
            {label: '客户名称', value: 'name'},
            {label: '英文名称', value: 'enName'},
            {label: '联系电话', value: 'telephone'},
            {label: '地址', value: 'address'},
            {label: '网址', value: 'url'},
            {label: '邮箱', value: 'email'},
          ]}
          name={name}
          setName={setName}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          isEmail
          status=""

          onSearch={(data: any) => {
            setParams({...data})
            setPage(1)

            // @ts-ignore
            props.history.push({
              pathname: 'customer',
              query: {
                searchValue,
                name
              }
            })
          }}
          resetSearch={() => {
            // setPage(1)
            // setPageSize(10)
            // setLimit(10)
            // setName('name')
            // setSearchValue('')
            //
            // console.log('searchValue -> ', searchValue)
            setName('name')
            setSearchValue('')
            const payload = {
              page: 1,
              pageSize: 10,
              limit: 10
            }
            dispatch!({
              type: 'customer/loadData',
              payload,
              callback: ({ list, totalCount } ) => {
                setDataSource(list)
                setTotalCount(totalCount)
              }
            })
          }}
        />

        <div className="table_wrapper">
          <Table
            sticky
            rowKey={(record: any) => record.id}
            size="small"
            // scroll={{scrollToFirstRowOnChange: true, x: 1700}}
            rowSelection={{...rowSelection}}
            pagination={{
              current: page,
              total: totalCount,
              showSizeChanger: true,
              showQuickJumper: true,
              onChange,
              showTotal: (total) => `总数 ${total} 条`
            }}
            columns={columns}
            dataSource={dataSource}
          />
        </div>
      </div>
        <AddForm onOk={fetchData} />
    </PageContainer>
  )
}

export default connect((state: any) => {
  const {customer: {value, isEmail, limit, params}} = state
  return {
    value,
    limit,
    isEmail,
    params
  }
})(Customer)


