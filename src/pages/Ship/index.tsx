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
    {title: '????????????', dataIndex: 'enName', key: 'enName', width: 200, render: (text: any) => <EllipsisTooltip title={text}> {text} </EllipsisTooltip>},
    {title: '????????????', dataIndex: 'name', key: 'name', name: 140, render: (text: any) => text ? <EllipsisTooltip title={text}> {text} </EllipsisTooltip>: '-'},
    {title: '????????????', dataIndex: 'isAbroad', key: 'isAbroad', width: 120, render: (isAbroad: any, item: any) => {
      return <Switch checked={isAbroad === 0 ? false : true} onChange={(checked) => {
        onSwitchChange(checked, item)
      } } size="small" />
    }},
    {title: '?????????', dataIndex: 'type', key: 'type', width: 200, render: (text: any) => text ? <EllipsisTooltip title={text}> {text} </EllipsisTooltip>: '-'},
    {title: '??????', dataIndex: 'shipNationality', key: 'shipNationality', width: 200, render: (text: any) => <EllipsisTooltip title={text}> {text} </EllipsisTooltip>},
    {title: '?????????', dataIndex: 'classificationSociety', key: 'classification_society', sorter: true, sortOrder: sortedInfo.columnKey === 'classification_society' && sortedInfo.order, width: 220, render: (text: any) => text ? <EllipsisTooltip title={text}> {text} </EllipsisTooltip>: '-'},
    {title: '??????', dataIndex: 'callSign', key: 'callSign'},
    {title: '??????', dataIndex: 'totalTons', key: 'total_tons', sorter: true, sortOrder: sortedInfo.columnKey === 'total_tons' && sortedInfo.order},
    {title: '??????', dataIndex: 'netTons', key: 'net_tons', sorter: true,sortOrder: sortedInfo.columnKey === 'net_tons'  && sortedInfo.order},
    {title: '?????????', dataIndex: 'dwt', key: 'dwt', sorter: true, sortOrder: sortedInfo.columnKey === 'dwt' && sortedInfo.order },
    {title: '????????????', dataIndex: 'createYear', key: 'createYear', width: 120, },
    {title: '?????????', dataIndex: 'length', key: 'length', sorter: true, sortOrder: sortedInfo.columnKey === 'length' && sortedInfo.order },
    {title: '?????????', dataIndex: 'width', key: 'width', sorter: true,sortOrder: sortedInfo.columnKey === 'width' && sortedInfo.order},
    {title: '??????', dataIndex: 'draft',  key: 'draft',},
    {title: '????????????', dataIndex: 'mainEngine', key: 'mainEngine', render: (text: any) => text ? <EllipsisTooltip title={text}> {text} </EllipsisTooltip>: '-'},
    {title: '????????????', dataIndex: 'auxiliaryEngine', key: 'auxiliaryEngine', render: (text: any) => text ? <EllipsisTooltip title={text}> {text} </EllipsisTooltip>: '-'},
    {title: '????????????????????????', dataIndex: 'handlingEquipment', key: 'handlingEquipment', ellipsis: {showTitle: false,}, render: (text: any) => text ? <EllipsisTooltip title={text}> {text} </EllipsisTooltip>: '-'},
    {title: '??????', dataIndex: 'navigationArea', key: 'navigationArea', render: (text: any) => text ? <EllipsisTooltip title={text}> {text} </EllipsisTooltip>: '-'},
    {title: '????????????', dataIndex: 'company', key: 'company', render: (text: any) => <EllipsisTooltip title={text}> {text} </EllipsisTooltip>},
    {title: '??????', dataIndex: 'email', key: 'email', width: 140, render: (text: any) => text ? <EllipsisTooltip title={text}> {text} </EllipsisTooltip>: '-'},
    {
      title: '????????????', dataIndex: 'state', render: (index: any) => {
        const obj = {
          0: {text: '??????', status: 'success'},
          1: {text: '??????', status: 'success'},
          2: {text: '??????', status: 'success'},
        }
        return obj[index] ? obj[index].text : ''
      },
    },
    {
      title: '????????????', dataIndex: 'isMonitor', render: (index: any) => {
        const obj = {
          0: {text: '?????????', status: 'success'},
          1: {text: '?????????', status: 'success'},
        }
        return obj[index].text
      },
    },
    {title: '????????????', dataIndex: 'createTime', width: 190, render: (text: any) => <EllipsisTooltip title={text}> {text} </EllipsisTooltip>},
    {title: '????????????', dataIndex: 'updateTime', width: 190, render: (text: any) => <EllipsisTooltip title={text}> {text} </EllipsisTooltip>},
    {
      title: '??????', fixed: 'right', align: 'center', width: '300px',
      render: (data: any, current?: any) => {
        const isAddMonitor = <Tooltip placement="topLeft" title="????????????????????????"><span style={{cursor: 'no-drop', opacity: 0.2}}>????????????</span></Tooltip>
        const addMonitorState = Number(current.state) === 1 ? isAddMonitor : '????????????';
        return (
          <Space>
            <a onClick={() => {
              let title;
              let content;
              if (current.isMonitor === 0) {
                title = '????????????';
                content = '???????????????????';
              } else {
                title = '????????????';
                content = '???????????????????';
              }

              if (Number(current.state) === 1) {
                return message.warning(`?????????????????????!??????????????????`);
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
                          message.success(`????????????`);
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
              {current.isMonitor === 0 ? addMonitorState : '????????????'}
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
            }}>????????????</a>
            <Divider type="vertical" />
            <a onClick={() => {
              dispatch!({
                type: 'ship/save',
                payload: { current, addVisible: true },
              });
            }}>??????</a>
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
    preserveSelectedRowKeys: true, // ???????????????????????????????????????
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
              }} type="primary">????????????</Button>
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
                filename="???????????????.xls"
                callBack={() => setSelectedRowKeys([])}
              />
            </Col>
            <Col>
              <Button onClick={() => {
                if (!list.length) return message.warning(`????????????`)
                if (!selectedRowKeys.length) return message.warning(`???????????????????????????`)
                confirm({
                  title: '??????????????????',
                  icon: <ExclamationCircleOutlined />,
                  content: '???????????????????????????',
                  onOk() {
                    return new Promise<void>((resolve, reject) => {
                      dispatch!({
                        type: 'ship/saveMonitor',
                        payload: selectedRowKeys,
                        callback: (res: any) => {
                          if (res.msg === 'success' || res.code === 0) {
                            message.success(`????????????`);
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

              }} type="primary">??????????????????</Button>
            </Col>
            <Col>
              <DeleteButton
                type="primary"
                size="middle"
                tag="button"
                text="????????????"
                contentTxt="?????????????????? ???"
                beforeDel={() => {
                  if (!list.length) return message.warning(`????????????`)
                  if (!selectedRowKeys.length) return message.warning(`???????????????????????????`)
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
                text="??????"
                hasList={list}
                url="exportShip"
                filename="???????????????.xls"
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
            {label: '????????????', value: 'enName'},
            {label: '????????????', value: 'name'},
            {label: '??????', value: 'shipNationality'},
            {label: '??????', value: 'callSign'},
            {label: '????????????', value: 'mainEngine'},
            {label: '????????????', value: 'auxiliaryEngine'},
            {label: '????????????', value: 'company'},
            {label: '?????????', value: 'classificationSociety'},
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
              showTotal={(total) => `?????? ${total} ???`}
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


