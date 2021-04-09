import React from 'react'
import {PageContainer} from '@ant-design/pro-layout'

import {Button, Card, Input, Space} from 'antd'
// import BoatStatus from '@/components/boatStatus';
import TableInfo from '@/components/TableInfo';
import FormSearch from '@/components/FormSearch';
import FormBuilder from '@/components/FormBuilder';

interface PageProps {
}

const Index: React.FC<PageProps> = (props) => {

  const formMeta = {
    colon: true,
    columns: 3,
    formItemLayout: {
      // labelCol: { span: 8 },
      // wrapperCol: { span: 18 },
    },
    elements: [
      {
        key: 'enterNum',
        label: '关键词',
        initialValue: '',
        placeholder: '输入关键词',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
      {
        key: 'status',
        label: '状态',
        initialValue: '',
        placeholder: '请选择',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
    ],
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'IMO',
      dataIndex: 'imo',
    },
    {
      title: '船舶名称',
      dataIndex: 'ship_name',
    },
    {
      title: '所属客户',
      dataIndex: 'owned_customer',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      render: () => (
        <Space>
          <Button type="primary" size='small'>立即采集</Button>
          <Button onClick={() => {  }} type="primary" size='small'>删除</Button>
        </Space>
      ),
    },
  ];
  const dataSource = [
    {
      id: '1',
      imo: '1213',
      ship_name: '一号',
      createTime: '2020-10-05',
      status: 0,
      owned_customer: '日本',
    },
  ];

  // @ts-ignore
  // @ts-ignore
  return (
    <PageContainer
    >
      <Card>
        <div>
          <FormSearch>
            <FormBuilder meta={formMeta}/>
          </FormSearch>
        </div>

        <TableInfo
          columns={columns}
          dataSource={dataSource}
        />

      </Card>
    </PageContainer>
  )
}

export default Index
