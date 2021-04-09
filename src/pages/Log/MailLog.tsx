import React, {useEffect, useState} from 'react'
import {PageContainer} from '@ant-design/pro-layout'

import {Badge, Descriptions, Card, Input, Modal, Table, message} from 'antd'

import {connect, ConnectProps} from "umi";
import Search from "@/components/Search";
import {setFileName} from "@/utils/utils";
import EllipsisTooltip from '@/components/EllipsisTooltip';

interface PageProps extends ConnectProps {
  emailLogList: any,
  totalCount: any,
  totalPage: any,
  page: any,
  pageSize: any,
  current: any,
}
const MailLog: React.FC<PageProps> = (props) => {
  const {dispatch, emailLogList, totalCount} = props
  const [visible, setVisible] = useState(false);
  const [describe, setDescribe] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [limit, setLimit] = useState(10);
  const [params, setParams] = useState({});

  useEffect(() => {
    dispatch!({
      type: 'log/getEmailLogList',
      payload: {
        page,
        pageSize,
        limit,
        ...params
      }
    })
  }, [page, pageSize, params, limit])

  const columns = [
    { title: '序号', dataIndex: 'id', align: 'center', width: 60},
    { title: '发送时间', dataIndex: 'sendTime', align: 'center', width: 180},
    {
      title: '状态',
      dataIndex: 'state',
      align: 'center',
      width: 80,
      render: (index: any) => {
        const obj = {
          0: {text: '失败', status: 'error'},
          1: {text: '成功', status: 'success'},
        }
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const {text, status} = obj[index]
        return <Badge status={status} text={text}/>
      },
    },
    {
      title: '发送类型',
      dataIndex: 'type',
      width: 120,
      align: 'center',
      render: (index: any) => {
        const obj = {
          1: {text: '伙食', status: 'success'},
          0: {text: '营销', status: 'error'},
        }
        return obj[index].text
      },
    },
    {
      title: '语言版本',
      dataIndex: 'edition',
      align: 'center',
      render: (index: any) => {
        const obj = {
          0: {text: '简体', status: 'success'},
          1: {text: '繁体', status: 'error'},
          2: {text: '英文', status: 'error'},
        }
        return obj[index].text
      },
    },
    {
      title: '模板名称',
      dataIndex: 'title',
      render: (text: any) => <EllipsisTooltip title={text}> {text} </EllipsisTooltip>},
    { title: '发送邮箱', dataIndex: 'sendEmail', },
    { title: '接收邮箱', dataIndex: 'receiveEmail', },
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      dataIndex: 'createTime',
      render: (i: any, {emailId}: any) => (
        <a
          onClick={() => {
            dispatch!({
              type: 'log/getEmailInfo',
              payload: {
                id: emailId
              }
            }).then((res: any) => {
               if (res.msg === 'success' && res.Email) {
                 setVisible(true)
                 setDescribe(res.Email)
              } else {
                 message.warning(`暂无查看信息`)
               }
            })
          }}
        >
          查看
        </a>
      ),
    },
  ];

  const onChange = (pageIndex: number, size: number) => {
    setPage(pageIndex)
    setParams(() => ({...params, page: pageIndex}))
    setPageSize(size)
    setLimit(size)
  }
  // @ts-ignore
  return (
    <PageContainer>
      <div className="content_wrapper">
        <Search
          status=""
          state={[{label: '发送成功', value: 1}, {label: '发送失败', value: 0}]}
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
            size="small"
            rowKey={(record: any) => record.id || 'id'}
            columns={columns}
            scroll={{scrollToFirstRowOnChange: true, x: 'max-content'}}
            dataSource={emailLogList}
            pagination={{
              total: totalCount,
              showSizeChanger: true,
              onChange,
              showTotal: (total) => `总数 ${total} 条`
            }}
          />
        </div>

        <Modal centered width={1000} visible={visible} getContainer={false} title="邮件日志" onCancel={()=> setVisible(false)} footer={false}>
          {
            describe && Object.keys(describe).length && <Descriptions bordered={true} size="small" column={1} layout="vertical">
              <Descriptions.Item label="标题">{describe.title}</Descriptions.Item>
              <Descriptions.Item label="内容">
                 <span dangerouslySetInnerHTML={{__html: describe.content}}/>
              </Descriptions.Item>
              <Descriptions.Item label="附件">{setFileName(describe.enclosure)}</Descriptions.Item>
            </Descriptions>
          }
        </Modal>

      </div>
    </PageContainer>
  )
}

export default connect((state: any) => {
  const {log: {emailLogList, totalPage, totalCount, page, pageSize, current}} = state
  return {
    emailLogList,
    totalPage,
    totalCount,
    page,
    pageSize,
    current,
  }
})(MailLog)
