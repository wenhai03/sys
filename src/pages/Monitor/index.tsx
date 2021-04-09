import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import { Col, Divider, message, Row, Table, Tooltip, Descriptions } from 'antd';
import Search from '@/components/Search';
import DeleteButton from '@/components/DeleteButton';
import EditTime from './components/EditTime';
import { connect } from 'umi';
import FileExport from '@/components/FileExport';

interface PageProps {
  list: any,
  totalCount: any,
  totalPage: any,
  page: any,
  pageSize: any,
  limit: any,
}

const Monitor: React.FC<PageProps> = (props) => {
  const {dispatch, list, totalCount,} = props
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [limit, setLimit] = useState(10);
  const [params, setParams] = useState({});

  const fetchData = () => {
    dispatch!({
      type: 'monitor/loadData',
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
  }, [page, pageSize, params])

  const columns = [
    {title: 'ID', dataIndex: 'id',},
    {title: 'IMO', dataIndex: 'imo',},
    {title: '船舶名称', dataIndex: 'name', render: (text, item) => {
      const {imo, enName, name, isForeign, type, company, email, totalTons, classificationSociety, shipNationality} = item.ship || {}
      const desc = <Descriptions title="船舶信息" column={1} size={"small"} >
        <Descriptions.Item label="IMO">{imo}</Descriptions.Item>
        <Descriptions.Item label="船舶名称">{enName}</Descriptions.Item>
        <Descriptions.Item label="中文名">{name}</Descriptions.Item>
        <Descriptions.Item label="是否外轮">{isForeign}</Descriptions.Item>
        <Descriptions.Item label="国籍">{shipNationality}</Descriptions.Item>
        <Descriptions.Item label="总吨">{totalTons}</Descriptions.Item>
        <Descriptions.Item label="船类型">{type}</Descriptions.Item>
        <Descriptions.Item label="所属客户">{company}</Descriptions.Item>
        <Descriptions.Item label="邮箱">{email || '-'}</Descriptions.Item>
        <Descriptions.Item label="船级社">{classificationSociety}</Descriptions.Item>
      </Descriptions>
      return (
        <Tooltip color="rgba(24,145,150,.75)" placement="topLeft" title={desc}>
          <a>{text}</a>
        </Tooltip>
      )
    },},
    {title: '状态', dataIndex: 'status',},
    {title: '当前位置', dataIndex: 'location',},
    {title: '预抵港口', dataIndex: 'dest',},
    {title: '预抵达时间', dataIndex: 'eta',},
    {title: '监控频率', dataIndex: 'monitorRate',},
    {title: '上次监控时间', dataIndex: 'preMonitorTime',},
    {title: '下次监控时间', dataIndex: 'nextMonitorTime',},
    {title: '创建时间', dataIndex: 'createTime',},
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      render: ({id, imo, nextMonitorTime}: any) => (
        <Row>
          <Col>
            <EditTime id={id} nextMonitorTime={nextMonitorTime} onOK={() => fetchData()} />
          </Col>
          <Divider type="vertical"/>
          <Col>
            <DeleteButton contentTxt="是否移除监控" text="移除监控" onOk={() => {
              dispatch!({
                type: 'monitor/del',
                payload: [imo],
                callback(res: any) {
                  if (res.msg === 'success' || res.code === 0) {
                    message.success(`操作成功`);
                    fetchData()
                  } else {
                    message.warning(`${res.msg}`);
                  }
                }
              })
            }}/>
          </Col>
        </Row>
      ),
    },
  ];

  const onChange = (pageIndex: number, size: number) => {
    setPage(pageIndex)
    setParams(() => ({...params, page: pageIndex}))
    setPageSize(size)
    setLimit(size)
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

  return (
    <PageContainer
      extra={
        <>
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
                  type: 'monitor/del',
                  payload: selectedRowKeys,
                  callback(res: any) {
                    if (res.msg === 'success' || res.code === 0) {
                      message.success(`操作成功`);
                      fetchData()
                    } else {
                      message.warning(`${res.msg}`);
                    }
                  }
                }
              )
            }}
            onCancel={() => setSelectedRowKeys([])}
          />

          <FileExport
            hasList={list}
            selectedRowKeys={selectedRowKeys}
            url="exportMonitor"
            filename="船舶信息表.xls"
            callBack={() => setSelectedRowKeys([])}
          />

          <FileExport
            isAll
            selectedRowKeys={[]}
            text="全部"
            hasList={list}
            url="exportMonitor"
            filename="船舶信息表.xls"
            callBack={() => setSelectedRowKeys([])}
          />
        </>
      }
    >
      <div className="content_wrapper">
        <Search
          needSelect={[
            {label: 'IMO', value: 'imo'},
            {label: '船舶名称', value: 'name'},
            {label: '预抵港口', value: 'dest'},
          ]}
          needTime={[
            {label: '预抵达时间', value: 'eta'},
            {label: '上次监控时间', value: 'pre_monitor_time'},
            {label: '下次监控时间', value: 'next_monitor_time'},
          ]}
          status={[{label: '在航', value: '在航'}, {label: '锚泊', value: '锚泊'}, {label: '靠泊', value: '靠泊'}, {
            label: '未知',
            value: '未知'
          }]}
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
            // sticky={pageSize === 10 ? true : false}
            rowKey={(record: any) => record.id}
            scroll={{scrollToFirstRowOnChange: true, x: 'max-content'}}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={list}
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
  const {monitor: {list, totalPage, totalCount, page, pageSize, limit}} = state
  return {
    list,
    totalPage,
    totalCount,
    page,
    pageSize,
    limit,
  }
})(Monitor)
