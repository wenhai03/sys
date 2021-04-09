import React from 'react'
import {PageContainer} from '@ant-design/pro-layout'

import {Button, Card, Input, Row, Space} from 'antd'
import TableInfo from '@/components/TableInfo';
import FormSearch from '@/components/FormSearch';
import FormBuilder from '@/components/FormBuilder';

import {ReloadOutlined} from '@ant-design/icons'

interface PageProps {
}

const Index: React.FC<PageProps> = (props) => {
  const formMeta = {
    colon: true,
    columns: 3,
    formItemLayout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    },
    elements: [
      {
        key: 'imo',
        label: 'IMO',
        initialValue: '',
        placeholder: '请输入船舶IMO',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
      {
        key: 'ship_name',
        label: '船舶名称',
        initialValue: '',
        placeholder: '请选择船舶名称',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
      {
        key: 'chinese_name',
        label: '中文名称',
        initialValue: '',
        placeholder: '请选择中文名称',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
      {
        key: 'citizenship',
        label: '国籍',
        initialValue: '',
        placeholder: '请选择',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
      {
        key: 'ship_society',
        label: '船级社',
        initialValue: '',
        placeholder: '请选择',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
      {
        key: 'call_sign',
        label: '呼号',
        initialValue: '',
        placeholder: '请选择',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
      {
        key: 'gross_tonnage',
        label: '总吨',
        initialValue: '',
        placeholder: '请选择',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
      {
        key: 'net_tons',
        label: '净吨',
        initialValue: '',
        placeholder: '请选择',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
      {
        key: 'load_weight',
        label: '载重吨',
        initialValue: '',
        placeholder: '请选择',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
      {
        key: 'construction_time',
        label: '建造时间',
        initialValue: '',
        placeholder: '请选择',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
      {
        key: 'ship_height',
        label: '船长',
        initialValue: '',
        placeholder: '请选择',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
      {
        key: 'ship_width',
        label: '船宽',
        initialValue: '',
        placeholder: '请选择',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
      {
        key: 'absorb_water',
        label: '吃水',
        initialValue: '',
        placeholder: '请选择',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
      {
        key: 'ship_type',
        label: '船型',
        initialValue: '',
        placeholder: '请选择',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
      {
        key: 'host_model',
        label: '主机型号',
        initialValue: '',
        placeholder: '请选择',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
      {
        key: 'machine_model',
        label: '辅机型号',
        initialValue: '',
        placeholder: '请选择',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
      {
        key: 'isBring',
        label: '是否带克令吊数量',
        initialValue: '',
        placeholder: '请选择',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
      {
        key: 'navigation_area',
        label: '航区',
        initialValue: '',
        placeholder: '请选择',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
      {
        key: 'owned_customer',
        label: '所属客户',
        initialValue: '',
        placeholder: '请选择',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
      {
        key: 'ship_status',
        label: '船舶状态',
        initialValue: '',
        placeholder: '请选择',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
      {
        key: 'monitoring_status',
        label: '监控状态',
        initialValue: '',
        placeholder: '请选择',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
      {
        key: 'creatTime',
        label: '创建时间',
        initialValue: '',
        placeholder: '请选择',
        widget: Input,
        widgetProps: {style: {width: '90%'}},
      },
    ],
  };

  // @ts-ignore

  return (
    <PageContainer
    >
      <Card>
        <FormBuilder meta={formMeta}/>
        <Row justify="end">
          <Space>
            <Button onClick={() => { // @ts-ignore
               props.history.go(-1) }} size="large">返回</Button>
            <Button type="primary" size="large">新增</Button>
          </Space>
        </Row>
      </Card>
    </PageContainer>
  )
}

export default Index
