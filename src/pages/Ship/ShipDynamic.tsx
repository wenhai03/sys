import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import { Button, Space, Table } from 'antd';
import Search from '@/components/Search';
import { connect, ConnectProps } from 'umi';
import AddShipDynamicForm from './components/AddShipDynamicForm';


interface PageProps extends ConnectProps {
  dynamicList: any,
  totalCount: any,
  totalPage: any,
  page: any,
  pageSize: any,
  limit: any,
}

const Ship: React.FC<PageProps> = (props) => {
  const { dispatch, dynamicList, totalCount } = props;
  // @ts-ignore
  const { shipImo } = props.location.query;

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [limit, setLimit] = useState(10);
  const [params, setParams] = useState({});

  const fetchData = () => {
    dispatch!({
      type: 'ship/getEventList',
      payload: {
        imo: shipImo,
        page,
        pageSize,
        limit,
        ...params,
      },
    });
  }

  useEffect(() => {
    fetchData()
  }, [page, pageSize, limit, params]);

  useEffect(() => {
    dispatch!({
      type: 'ship/save',
      payload: {
        imo: shipImo,
      },
    });
  }, []);

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 80 },
    { title: '日期', dataIndex: 'happentime' },
    { title: '船舶状态', dataIndex: 'status', align: 'center', width: 80 },
    { title: '预抵港日期', dataIndex: 'eta' },
    { title: '预抵港港口', dataIndex: 'dest' },
    { title: '当前点', dataIndex: 'location' },
    { title: '创建时间', dataIndex: 'createTime' },
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      width: 100,
      dataIndex: 'createTime',
      render: (data: any, item: any) => (
        <Space>
          < a onClick={() => {
            dispatch!({
              type: 'ship/save',
              payload: {
                addShipDynamicVisible: true,
                current: item,
              },
            });
          }}>编辑</a>
        </Space>
      ),
    },
  ];

  const onChange = (pageIndex: number, size: number) => {
    setPage(pageIndex);
    setParams(() => ({ ...params, page: pageIndex }));
    setPageSize(size);
    setLimit(size);
  };

  // @ts-ignore
  return (
    <PageContainer
      extra={<Button onClick={() => {
        dispatch!({
          type: 'ship/save',
          payload: {
            addShipDynamicVisible: true,
          },
        });
      }} type="primary">新增船舶动态</Button>}
    >
      <div className="content_wrapper">
        <Search
          status={[{ label: '在航', value: '在航' }, { label: '锚泊', value: '锚泊' }, {
            label: '靠泊',
            value: '靠泊',
          }, { label: '未知', value: '未知' }]}
          onSearch={(data: any) => {
            setParams({ ...data, page: 1 });
          }}
          resetSearch={() => {
            setPage(1);
            setPageSize(10);
            setLimit(10);
            setParams({});
          }}
        />
        <div className="table_wrapper">
          <Table
            sticky={dynamicList && dynamicList.length > 0 ? true : false}
            size="small"
            rowKey={(record: any) => record.id || 'id'}
            scroll={{ scrollToFirstRowOnChange: true, x: 'max-content' }}
            pagination={{
              total: totalCount,
              showSizeChanger: true,
              onChange,
              showTotal: (total) => `总数 ${total} 条`,
            }}
            columns={columns}
            dataSource={dynamicList}
          />
        </div>

        <AddShipDynamicForm onOk={fetchData} />
      </div>
    </PageContainer>
  );
};

export default connect((state: any) => {
  const { ship: { dynamicList, totalPage, totalCount, page, pageSize, limit, imo } } = state;

  return {
    dynamicList,
    totalPage,
    totalCount,
    page,
    pageSize,
    limit,
  };
})(Ship);


