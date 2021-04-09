import React, { useEffect, useMemo, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Col, Divider, message, Modal, Pagination, Row, Space, Table, Tooltip, Switch } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import DeleteButton from '@/components/DeleteButton';
import FileExport from '@/components/FileExport';
import EllipsisTooltip from '@/components/EllipsisTooltip';
import { connect, ConnectProps } from 'umi';
import BatchImport from '@/components/BatchImport';
import Search from './components/Search';
import AddForm from './components/AddForm';

const {confirm} = Modal

interface PageProps extends ConnectProps {
  list: any,
  totalCount: any,
}

const Ship: React.FC<PageProps> = (props) => {
  const {dispatch, list, totalCount} = props
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [page, setPage] = useState(+props.location.query.page|| 1);
  const [pageSize, setPageSize] = useState(+props.location.query.pageSize || 10);
  const [limit, setLimit] = useState(+props.location.query.pageSize || 10);
  const [sortedInfo, setSortInfo] = useState({
    columnKey: 'create_time',
    order: false
  });
  const [params, setParams] = useState({});
  // @ts-ignore
  const {company} = props.location.query

  const fetchData = () => {
    const {columnKey='create_time', order='false'} = sortedInfo

    dispatch!({
      type: 'ship/loadData',
      payload: {page, pageSize, limit, sort: order, sortValue: columnKey, company, ...params}
    })
  }
  useEffect(() => {
    fetchData()
  }, [page, pageSize, company, params, sortedInfo])

  const dataSource = useMemo(() => {
      return list
  }, [list])

  function onSwitchChange(checked: any, item) {
    dispatch!({
      type: 'ship/update',
      payload: {id: item.id, ...item, isAbroad: checked ? 1: 0, },
      callback: () => {
        fetchData()
      }
    })
  }

  const columns = [
    {title: 'ID', fixed: 'left', dataIndex: 'id', width: 60, },
    {title: 'IMO', fixed: 'left', dataIndex: 'imo', key: 'imo', width: 100, },
    {title: 'MMSI', dataIndex: 'mmsi', key: 'mmsi', width: 100, render: (text: any) => text ? <EllipsisTooltip title={text}> {text} </EllipsisTooltip>: '-'},
    {title: '船舶名称', dataIndex: 'enName', key: 'enName', width: 200, render: (text: any) => <EllipsisTooltip title={text}> {text} </EllipsisTooltip>},
    {title: '中文名称', dataIndex: 'name', key: 'name', name: 140, render: (text: any) => text ? <EllipsisTooltip title={text}> {text} </EllipsisTooltip>: '-'},
    {title: '是否外轮', dataIndex: 'isAbroad', key: 'isAbroad', width: 120, render: (isAbroad: any, item: any) => {
      return <Switch checked={isAbroad === 0 ? false : true} onChange={(checked) => {
        onSwitchChange(checked, item)
      } } size="small" />
    }},
    {title: '船类型', dataIndex: 'type', key: 'type', width: 200, render: (text: any) => text ? <EllipsisTooltip title={text}> {text} </EllipsisTooltip>: '-'},
    {title: '国籍', dataIndex: 'shipNationality', key: 'shipNationality', width: 200, render: (text: any) => <EllipsisTooltip title={text}> {text} </EllipsisTooltip>},
    {title: '船级社', dataIndex: 'classificationSociety', key: 'classification_society', sorter: true, sortOrder: sortedInfo.columnKey === 'classification_society' && sortedInfo.order, width: 220, render: (text: any) => text ? <EllipsisTooltip title={text}> {text} </EllipsisTooltip>: '-'},
    {title: '呼号', dataIndex: 'callSign', key: 'callSign'},
    {title: '总吨', dataIndex: 'totalTons', key: 'total_tons', sorter: true, sortOrder: sortedInfo.columnKey === 'total_tons' && sortedInfo.order},
    {title: '净吨', dataIndex: 'netTons', key: 'net_tons', sorter: true,sortOrder: sortedInfo.columnKey === 'net_tons'  && sortedInfo.order},
    {title: '载重吨', dataIndex: 'dwt', key: 'dwt', sorter: true, sortOrder: sortedInfo.columnKey === 'dwt' && sortedInfo.order },
    {title: '建造时间', dataIndex: 'createYear', key: 'createYear', width: 120, },
    {title: '船长度', dataIndex: 'length', key: 'length', sorter: true, sortOrder: sortedInfo.columnKey === 'length' && sortedInfo.order },
    {title: '船宽度', dataIndex: 'width', key: 'width', sorter: true,sortOrder: sortedInfo.columnKey === 'width' && sortedInfo.order},
    {title: '吃水', dataIndex: 'draft',  key: 'draft',},
    {title: '主机型号', dataIndex: 'mainEngine', key: 'mainEngine', render: (text: any) => text ? <EllipsisTooltip title={text}> {text} </EllipsisTooltip>: '-'},
    {title: '辅机型号', dataIndex: 'auxiliaryEngine', key: 'auxiliaryEngine', render: (text: any) => text ? <EllipsisTooltip title={text}> {text} </EllipsisTooltip>: '-'},
    {title: '是否带克令吊数量', dataIndex: 'handlingEquipment', key: 'handlingEquipment', ellipsis: {showTitle: false,}, render: (text: any) => text ? <EllipsisTooltip title={text}> {text} </EllipsisTooltip>: '-'},
    {title: '航区', dataIndex: 'navigationArea', key: 'navigationArea', render: (text: any) => text ? <EllipsisTooltip title={text}> {text} </EllipsisTooltip>: '-'},
    {title: '所属客户', dataIndex: 'company', key: 'company', render: (text: any) => <EllipsisTooltip title={text}> {text} </EllipsisTooltip>},
    {title: '邮箱', dataIndex: 'email', key: 'email', width: 140, render: (text: any) => text ? <EllipsisTooltip title={text}> {text} </EllipsisTooltip>: '-'},
    {
      title: '船舶状态', dataIndex: 'state', render: (index: any) => {
        const obj = {
          0: {text: '运营', status: 'success'},
          1: {text: '拆船', status: 'success'},
          2: {text: '在建', status: 'success'},
        }
        return obj[index] ? obj[index].text : ''
      },
    },
    {
      title: '监控状态', dataIndex: 'isMonitor', render: (index: any) => {
        const obj = {
          0: {text: '未监控', status: 'success'},
          1: {text: '监控中', status: 'success'},
        }
        return obj[index].text
      },
    },
    {title: '创建时间', dataIndex: 'createTime', width: 190, render: (text: any) => <EllipsisTooltip title={text}> {text} </EllipsisTooltip>},
    {title: '更新时间', dataIndex: 'updateTime', width: 190, render: (text: any) => <EllipsisTooltip title={text}> {text} </EllipsisTooltip>},
    {
      title: '操作', fixed: 'right', align: 'center', width: '300px',
      render: (data: any, current?: any) => {
        const isAddMonitor = <Tooltip placement="topLeft" title="拆船不能添加监控"><span style={{cursor: 'no-drop', opacity: 0.2}}>添加监控</span></Tooltip>
        const addMonitorState = Number(current.state) === 1 ? isAddMonitor : '添加监控';
        return (
          <Space>
            <a onClick={() => {
              let title;
              let content;
              if (current.isMonitor === 0) {
                title = '添加监控';
                content = '是否添加监控?';
              } else {
                title = '移除监控';
                content = '是否移除监控?';
              }

              if (Number(current.state) === 1) {
                return message.warning(`当前状态为拆船!不能添加监控`);
              }

              // @ts-ignore
              setSelectedRowKeys([current.id]);
              confirm({
                title,
                icon: <ExclamationCircleOutlined />,
                content,
                onOk() {
                  const urlType = current.isMonitor === 0 ? 'ship/saveMonitor' : 'monitor/del';
                  return new Promise<void>((resolve, reject) => {
                    dispatch!({
                      type: urlType,
                      payload: current.isMonitor === 0 ? [current.id] : [current.imo] ,
                      callback(res: any) {
                        if (res.msg === 'success' || res.code === 0) {
                          resolve();
                          message.success(`操作成功`);
                          fetchData();
                        } else {
                          resolve()
                          message.warning(`${res.msg}`);
                        }
                        setSelectedRowKeys(() => []);
                      },
                    });
                  });
                },
                onCancel() {
                  setSelectedRowKeys(() => []);
                },
              });

            }}>
              {current.isMonitor === 0 ? addMonitorState : '移除监控'}
            </a>
            <Divider type="vertical" />
            <a onClick={() => {
              dispatch!({
                type: 'ship/save',
                payload: { imo: current.imo },
              });
              // @ts-ignore
              props.history.push({
                pathname: '/ship/shipDynamic',
                query: {
                  shipImo: current.imo,
                  page,
                  pageSize,
                },
              });
            }}>船舶动态</a>
            <Divider type="vertical" />
            <a onClick={() => {
              dispatch!({
                type: 'ship/save',
                payload: { current, addVisible: true },
              });
            }}>编辑</a>
            <Divider type="vertical" />
            <DeleteButton
              onOk={() => {
                dispatch!({
                    type: 'ship/del',
                    payload: [current.id],
                    callback: () => {
                      fetchData();
                    },
                  },
                );
              }}
            />
          </Space>
        );
      },
    },
  ]

  const onChange = (pageIndex: number, size: number) => {
    setPage(pageIndex)
    setParams(() => ({...params, page: pageIndex}))
    setPageSize(size)
    setLimit(size)
    // @ts-ignore
    props.history.push({
      pathname: 'ship',
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
    hideDefaultSelections: true,
    selections: false,
    // getCheckboxProps: item => ({disabled: item.cattleState === 2 || item.isLocking === 2})
  };

  const onTableChange = (pagination: any, filters: any, sorter: any) => {
    if (typeof sorter.order !== 'boolean') setSortInfo(sorter)
  }

  return (
    <PageContainer
      extra={
        <Row>
          <Space>
            <Col>
              <Button onClick={() => {
                dispatch!({
                  type: 'ship/save',
                  payload: {addVisible: true,}
                })
              }} type="primary">添加船舶</Button>
            </Col>
            <Col>
              <BatchImport
                apiUrl="importShip"
                templateUrl="downloadShipTemplate"
                onOk={() => {
                  fetchData()
                }}/>
            </Col>
            <Col>
              <FileExport
                hasList={list}
                selectedRowKeys={selectedRowKeys}
                url="exportShip"
                filename="船舶信息表.xls"
                callBack={() => setSelectedRowKeys([])}
              />
            </Col>
            <Col>
              <Button onClick={() => {
                if (!list.length) return message.warning(`暂无数据`)
                if (!selectedRowKeys.length) return message.warning(`请选择批量添加监控`)
                confirm({
                  title: '批量添加监控',
                  icon: <ExclamationCircleOutlined />,
                  content: '是否批量添加监控？',
                  onOk() {
                    return new Promise<void>((resolve, reject) => {
                      dispatch!({
                        type: 'ship/saveMonitor',
                        payload: selectedRowKeys,
                        callback: (res: any) => {
                          if (res.msg === 'success' || res.code === 0) {
                            message.success(`操作成功`);
                            fetchData()
                            resolve()
                          } else {
                            reject()
                            message.warning(`${res.msg}`);
                          }
                          setSelectedRowKeys(() => [])
                        }
                      }).catch(() => { reject() })
                    })
                  },
                  onCancel() { setSelectedRowKeys(() => []) },
                })

              }} type="primary">批量添加监控</Button>
            </Col>
            <Col>
              <DeleteButton
                type="primary"
                size="middle"
                tag="button"
                text="批量删除"
                contentTxt="是否批量删除 ？"
                beforeDel={() => {
                  if (!list.length) return message.warning(`暂无数据`)
                  if (!selectedRowKeys.length) return message.warning(`请选择要删除的数据`)
                  return !!list.length
                }}
                onOk={() => {
                  dispatch!({
                      type: 'ship/del',
                      payload: selectedRowKeys,
                      callback: () => {
                        fetchData()
                        setSelectedRowKeys([])
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
                hasList={list}
                url="exportShip"
                filename="船舶信息表.xls"
              />
            </Col>
          </Space>
        </Row>
      }
    >
      <div className="content_wrapper">
        <Search
          needShipSelect
          shipType
          needSelect={[
            {label: 'IMO', value: 'imo'},
            {label: '船舶名称', value: 'enName'},
            {label: '中文名称', value: 'name'},
            {label: '国籍', value: 'shipNationality'},
            {label: '呼号', value: 'callSign'},
            {label: '主机型号', value: 'mainEngine'},
            {label: '辅机型号', value: 'auxiliaryEngine'},
            {label: '所属客户', value: 'company'},
            {label: '船级社', value: 'classificationSociety'},
          ]}
          value={false}
          status
          isMonitor
          isEmail
          isMMSI
          dwt={false}
          onSearch={(data: any) => {
            if (data.type) {
              // eslint-disable-next-line no-param-reassign
              data.type = data.type.join(',')
            }
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
            columns={columns}
            onChange={onTableChange}
            dataSource={dataSource}
            size="small"
            sticky
            rowKey={(record: any) => record.id}
            rowSelection={rowSelection}
            pagination={false}
            scroll={{scrollToFirstRowOnChange: true, x: 3500}}
          />
        </div>
        <Row justify="end" style={{margin: '16px 0'}}>
          <Col>
            <Pagination
              size="small"
              current={page}
              total={totalCount}
              defaultCurrent={1}
              onChange={onChange}
              showSizeChanger
              showQuickJumper
              showTotal={(total) => `总数 ${total} 条`}
            />
          </Col>
        </Row>

        <AddForm onOK={fetchData} page={page} pageSize={pageSize} sortedInfo={sortedInfo} company={company} />
      </div>
    </PageContainer>
  )
}

export default connect((state: any) => {
  const {ship: {list, totalCount}} = state
  return {
    list,
    totalCount,
  }
})(Ship)


