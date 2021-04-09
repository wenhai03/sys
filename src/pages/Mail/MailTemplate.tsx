import React, {useEffect, useState} from 'react'
import {PageContainer} from '@ant-design/pro-layout'
import {connect, ConnectProps} from 'umi'
import {Button, Divider, Table, Modal, Badge, Tooltip, Descriptions} from 'antd'
import DeleteButton from '@/components/DeleteButton';
import EllipsisTooltip from '@/components/EllipsisTooltip';

interface PageProps extends ConnectProps {
  list: any,
  totalCount: any,
  totalPage: any,
  page: any,
  pageSize: any,
  limit: any,
}

const Mail: React.FC<PageProps> = (props) => {
  const {dispatch, list, totalCount} = props
  const [visible, setVisible] = useState(false);
  const [describe, setDescribe] = useState(null); // 查看信息数据

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [limit, setLimit] = useState(10);
  const [params, setParams] = useState({});

  const fetchData = () => {
    dispatch!({
      type: 'mail/loadData',
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
    {title: 'ID', dataIndex: 'id'},
    {
      title: '业务类型',
      align: 'center',
      dataIndex: 'type',
      render: (index: number) => {
        const obj = {
          0: '营销',
          1: '伙食',
        }
        return obj[index]
      },
    },
    {
      title: '语言版本',
      align: 'center',
      dataIndex: 'edition',
      render: (index: number) => {
        const obj = {
          0: '简体',
          1: '繁体',
          2: '英文',
        }
        return obj[index]
      },
    },
    {title: '标题', dataIndex: 'title', render: (text: any) => <EllipsisTooltip title={text}> {text} </EllipsisTooltip>},
    {
      title: '附件名字',
      dataIndex: 'enclosure',
      ellipsis: {
        showTitle: false,
      },
      render: (address: any) => (
         <Tooltip placement="topLeft" title={address}>
          {address || '-'}
        </Tooltip>
      ),
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (index: any) => {
        const obj = {
          0: {text: '正常', status: 'success'},
          1: {text: '已删除', status: 'error'},
        }
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const {text, status} = obj[index]
        return <Badge status={status} text={text}/>
      },

    },
    {title: '创建时间', dataIndex: 'createTime',},
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      render: ({id}: any, item: any) => (
        <>
          <a onClick={() => {
            setVisible(true)
            setDescribe(item)
          }}>查看</a>
          <Divider type="vertical"/>
          <a onClick={() => {
            // @ts-ignore
            props.history.push({
              pathname: "/mail/mailTemplate/add",
              query: {id}
            })

          }}>编辑</a>
          <Divider type="vertical"/>

          <DeleteButton onOk={() => {
            dispatch!({
              type: 'mail/del',
              payload: id,
              callback: () => {
                fetchData()
              }
            })
          }}/>
        </>
      ),
    },
  ];

  const onChange = (pageIndex: number, size: number) => {
    setPage(pageIndex)
    setParams(() => ({...params, page: pageIndex}))
    setPageSize(size)
    setLimit(size)
  }

  const editionObj = {
    0: '简体',
    1: '繁体',
    2: '英文',
  }

  const typeObj = {
    0: '营销',
    1: '伙食',
  }

  return (
    <PageContainer
      extra={<Button onClick={() => {
        props.history.push({
          pathname: "/mail/mailTemplate/add",
        })
      }} type="primary">新增邮件模板</Button>}
    >
      <div className="content_wrapper">

        <div className="table_wrapper">
          <Table
            size="small"
            rowKey={(record: any) => record.id || 'id'}
            scroll={{scrollToFirstRowOnChange: true, x: 'max-content'}}
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

      <Modal centered width={1000} visible={visible} getContainer={false} title="邮件内容" onCancel={() => setVisible(false)}
             footer={false}>
        {
          describe && Object.keys(describe).length &&
          <Descriptions
            bordered={true}
            column={2}
            size="small">
            <Descriptions.Item label="业务类型">{typeObj[describe.type]}</Descriptions.Item>
            <Descriptions.Item label="语言版本">{editionObj[describe.edition]}</Descriptions.Item>
            <Descriptions.Item label="邮件标题">{describe.title}</Descriptions.Item>
            <Descriptions.Item label="附件">{describe.enclosure}</Descriptions.Item>
            <Descriptions.Item label="邮件内容">
              <span dangerouslySetInnerHTML={{__html: describe.content}}/>
            </Descriptions.Item>
          </Descriptions>
        }
      </Modal>
    </PageContainer>
  )
}

export default connect((state: any) => {
  const {mail: {list, totalPage, totalCount, page, pageSize, limit}} = state
  return {
    list,
    totalPage,
    totalCount,
    page,
    pageSize,
    limit,
  }
})(Mail)
