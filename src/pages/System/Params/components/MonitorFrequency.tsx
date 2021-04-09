import React, {useState} from 'react'
import {connect, ConnectProps} from 'umi'

import {Button, Card, Table, Space, Modal, message} from 'antd'
import {EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import DeleteButton from '@/components/DeleteButton'
import AddForm from './AddForm'

const {confirm} = Modal

interface PageProps extends ConnectProps {
  monitorFrequencyList: any
}

const Index: React.FC<PageProps> = (props) => {

  const {monitorFrequencyList, dispatch}: any = props
  console.log('monitorFrequencyList -> ', monitorFrequencyList)
  const columns = [
    {
      title: '航区',
      dataIndex: 'paramKey',
    },
    {
      title: '在航间隔天数',
      dataIndex: 'paramValue',
      render: (val: any) => {
        return val ? `${val}天` : ''
      }
    },
    {
      title: '靠泊提前天数',
      dataIndex: 'paramValue1',
      render: (val: any) => {
        // @ts-ignore
        return (typeof val === "null") ? '' : `${val}天`
      }
    },
    {
      title: '操作',
      render: ({paramKey, paramValue, paramValue1, type, id}: any) => {
        return (
          <Space>
            <Button
              onClick={() => {
                dispatch!({
                  type: 'system/save',
                  payload: {
                    addVisible: true,
                    frequencyItemInfo: {
                      days: paramValue,
                      preDays: paramValue1,
                      country: paramKey,
                      type,
                      id,
                    }
                  }
                })
              }}
              type="primary" size="small">编辑</Button>

            <DeleteButton
              type="default"
              size="small"
              tag="button"
              text="删除"
              onOk={() => {
                dispatch!({
                    type: 'system/del',
                    payload: id
                  }
                )
              }}

            />
          </Space>
        )
      }
    }
  ]

  return (
    <Card
      title="监控频率："
      extra={<Button type="primary" onClick={() => {
        dispatch!({
          type: 'system/save',
          payload: {
            addVisible: true,
            frequencyItemInfo: {}
          }
        })
      }}>新增</Button>}
    >

      <Table size="small" columns={columns} dataSource={monitorFrequencyList} rowKey="id"/>

      <AddForm/>

    </Card>
  )
}

export default connect((state: any) => {
  return {
    monitorFrequencyList: state.system.monitorFrequencyList
  }
})(Index)
