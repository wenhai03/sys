import React, { useEffect } from 'react';
import { Button, Table } from 'antd';
import { connect, ConnectProps } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { ReloadOutlined, EditOutlined } from '@ant-design/icons';
import EditForm from './components/EditForm';
import { resetImgUrl } from '@/utils/utils';

interface PageProps extends ConnectProps {
  category: any;
}

const MovieCategory: React.FC<PageProps> = (props) => {
  const { dispatch } = props;
  const { list } = props.category;
  useEffect(() => {
    dispatch!({
      type: 'movieCategory/loadData',
      payload: {},
    });
  }, []);
  const columns = [
    {
      title: '序号',
      width: 80,
      align: 'center',
      render: (row: any, k: any, index: number) => <span>{index + 1}</span>,
    },
    {
      title: '名字',
      dataIndex: 'name',
    },
    {
      title: '简介',
      dataIndex: 'desc',
      ellipsis: 'true',
    },
    {
      title: '主图',
      render: (row: any) => {
        return (
          <img style={{ height: '60px', width: '60px' }} src={resetImgUrl(row.coverImage)} alt="img" onClick={() => {
            dispatch!({
              type: 'movieCategory/save',
              payload: {
                showEidt: true,
                current: row,
                isEdit: true,
              },
            });
          }} />
        );
      },
      align: 'center',
    },
    {
      title: '操作',
      render: (row: any) => {
        return <Button
          onClick={() => {
            dispatch!({
              type: 'movieCategory/save',
              payload: {
                showEdit: true,
                isEdit: true,
                current: row,
              },
            });
          }}
          type="primary" size="small" icon={<EditOutlined />}>

        </Button>
      },
    },
  ];
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <PageContainer
      extra={
        <>
          <Button type="primary" icon={<ReloadOutlined />} />
          <Button type="primary" onClick={() => {
            dispatch!({
              type: 'movieCategory/save',
              payload: {
                showEdit: true,
                isEdit: false,
                current: {
                  name: '',
                  desc: '',
                  coverImage: '',
                },
              },
            });
          }}>新增</Button>
        </>
      }
    >
      <Table columns={columns} dataSource={list} rowKey="id" />
      <EditForm />
    </PageContainer>
  );
};

export default connect((state: any) => {
  return {
    category: state.movieCategory,
  };
})(MovieCategory);
