import React, {useEffect, useState} from 'react'
import {PageContainer} from '@ant-design/pro-layout'

import {Button, Card, Space, Table, Row, Col, Badge, Divider, message} from 'antd'
import {connect, ConnectProps} from "umi";
import DeleteButton from '@/components/DeleteButton'
import Search from "@/components/Search";
import BatchImport from "@/components/BatchImport";
import AddImoForm from "./components/AddImoForm";
import CollectNow from "./components/CollectNow";
import FileExport from '@/components/FileExport';

interface PageProps extends ConnectProps {
  list: any,
  totalCount: any,
  totalPage: any,
  page: any,
  pageSize: any,
  limit: any,
}

const Collection: React.FC<PageProps> = (props) => {
  const {dispatch, list, totalCount} = props
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [limit, setLimit] = useState(10);
  const [params, setParams] = useState({});


  const fetchData = () => {
    dispatch!({
      type: 'collection/loadData',
      payload: {
        page,
        pageSize,
        limit,
        ...params
      }
    })
  }
  useEffect(() => {
    fetchData()
  }, [page, pageSize, limit, params])


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      with: 80
    },
    {
      title: 'IMO',
      dataIndex: 'imo',
      with: 120
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (index: any) => {
        const obj = {
          0: {text: '未采集', status: 'default'},
          1: {text: '采集成功', status: 'success'},
          2: {text: '查无此船', status: 'warning'},
        }
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const {text = "", status} = obj[index]
        return <Badge status={status} text={text}/>
      },

    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      with: 200
    },
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      render: ({id, imo, state}: any) => {
        return (
          <>
            {
              Number(state) === 0 ? <CollectNow callback={() => {
                fetchData()
              }
              } imo={imo}/> : <span style={{cursor: 'no-drop', opacity: 0.2}}>
                立即采集
              </span>
            }
            <Divider type="vertical"/>
            <DeleteButton onOk={() => {
              dispatch!({
                  type: 'collection/del',
                  payload: [id],
                  callback: () => {
                    fetchData()
                  }
                }
              )
            }}/>
          </>
        )
      },
    },
  ];

  const rowSelection = {
    preserveSelectedRowKeys: true, // 翻页时候全选状态还能保留住
    onChange: (selectedKeys: any, selectedRows: any) => {
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

  const onChange = (pageIndex: number, size: number) => {
    setPage(pageIndex)
    setParams(() => ({...params, page: pageIndex}))
    setPageSize(size)
    setLimit(size)
  }

  // @ts-ignore
  return (
    <PageContainer
      extra={
        <Row>
          <Space>
            <Col>
              <Button onClick={() => {
                dispatch!({
                  type: 'collection/save',
                  payload: {
                    showAddImo: true,
                    imo: ''
                  }
                })
              }} type="primary">新增IMO</Button>
            </Col>
            <Col>
              <FileExport
                hasList={list}
                selectedRowKeys={selectedRowKeys}
                url="/exportImo"
                filename="采集信息表.xls"
                callBack={() => setSelectedRowKeys([])}
              />
            </Col>
            <Col>
              <FileExport
                isAll
                selectedRowKeys={[]}
                text="全部"
                hasList={list}
                url="exportImo"
                filename="采集信息表.xls"
              />
            </Col>
            <Col>
              <BatchImport
                text="导入IMO文件"
                apiUrl="importImo"
                templateUrl="downloadImoTemplate"
                onOk={() => {
                  dispatch!({
                    type: 'collection/loadData',
                    payload: {
                      page: 1,
                      pageSize: 10,
                      limit: 10
                    }
                  })
                }}/>
            </Col>

            <Col>
              <DeleteButton
                type="primary"
                size="middle"
                tag="button"
                text="批量删除"
                contentTxt="是否批量删除 ？"
                beforeDel={() => {
                  if (!list.length) {
                    message.warning(`暂无数据`)
                    return false
                  }
                  if (!selectedRowKeys.length) {
                    message.warning(`请选择要删除的数据`)
                    return false
                  }

                  return !!list.length
                }}
                onOk={() => {
                  dispatch!({
                      type: 'collection/del',
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
          </Space>
        </Row>
      }
    >
      <div className="content_wrapper">
        <Search
          value
          status=""
          state={[{label: '采集成功', value: 1}, {label: '未采集', value: 0}, {label: '查无此船', value: 2}]}
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
            rowKey={(record: any) => record.id}
            scroll={{scrollToFirstRowOnChange: true, x: 'max-content'}}
            columns={columns}
            dataSource={list}
            rowSelection={{...rowSelection}}
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

      <AddImoForm/>
    </PageContainer>
  )
}

export default connect((state: any) => {
  const {collection: {list, totalPage, totalCount, page, pageSize, limit}} = state
  return {
    list,
    totalPage,
    totalCount,
    page,
    pageSize,
    limit,
  }
})(Collection)
