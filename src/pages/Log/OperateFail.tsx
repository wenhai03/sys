import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import { Card, Input, Table } from 'antd';
import FormSearch from '@/components/FormSearch';
import FormBuilder from '@/components/FormBuilder';

import { connect, ConnectProps } from 'umi';
import DatePickerTime from '@/components/DatePickerTime';
import Search from '@/components/Search';
import { history } from '@@/core/history';

interface PageProps extends ConnectProps {
  taskLogList: any,
  totalCount: any,
  totalPage: any,
  page: any,
  pageSize: any,
  limit: any,
}

const OperateFail: React.FC<PageProps> = (props) => {
  const { dispatch } = props;
  const type = props.history.location.query.type


  const [list, setList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [limit, setLimit] = useState(10);
  const [params, setParams] = useState({});

  useEffect(() => {
    console.log(props);
    dispatch!({
      type: 'log/getFailLogList',
      payload: {
        page,
        pageSize,
        limit,
        type,
      },
      callback: ({list, totalCount, currPage}) => {
        setList(list)
        setTotalCount(totalCount)
        setPage(currPage)

      },
    });
  }, [page, pageSize, limit, type]);

  const columns = [
    {
      title: 'IMO',
      dataIndex: 'imo',
    },
    {
      title: '失败原因',
      dataIndex: 'failReason',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
  ];

  const onChange = (pageIndex: number, size: number) => {
    setPage(pageIndex);
    setPageSize(size);
    setLimit(size);
  };


  return (
    <PageContainer>
      <div className="content_wrapper">
        <Table
          size="small"
          rowKey={(record: any) => record.id || 'id'}
          scroll={{scrollToFirstRowOnChange: true, x: true}}
          columns={columns}
          dataSource={list}
          pagination={{
            current: page,
            total: totalCount,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange,
            showTotal: (total) => `总数 ${total} 条`,
          }}
        />
      </div>
    </PageContainer>
  );
};

export default connect((state: any) => {
  const { log: { taskLogList, totalPage, totalCount, page, pageSize, limit } } = state;
  return {
    taskLogList,
    totalPage,
    totalCount,
    page,
    pageSize,
    limit,
  };
})(OperateFail);

