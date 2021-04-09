import React, {useEffect, useState} from 'react'
import {PageContainer} from '@ant-design/pro-layout'
import {connect, ConnectProps} from 'umi'
import Search from './components/Search';
import { Divider, Table, Modal, Badge, Tooltip, Descriptions, Space, Button, Row, message } from 'antd';
import DeleteButton from '@/components/DeleteButton';

interface PageProps extends ConnectProps {
  list: any,
  totalCount: any,
  page: any,
  pageSize: any,
  limit: any,
}

const MailSend: React.FC<PageProps> = (props) => {
  const {dispatch} = props
  const [visible, setVisible] = useState(false);
  const [describe, setDescribe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);

  const [list, setList] = useState([]);
  const [totalCount, setTotalCount] = useState(null);

  const [page, setPage] = useState(+props.location.query.page|| 1);
  const [pageSize, setPageSize] = useState(+props.location.query.pageSize || 10);
  const [limit, setLimit] = useState(+props.location.query.pageSize || 10);
  const [params, setParams] = useState({});

  const fetchData = () => {
    dispatch!({
      type: 'mail/getSendEmailList',
      payload: {
        page,
        pageSize,
        limit,
        ...params
      },
      callback: (list, totalCount) => {
        setList(list)
        setTotalCount(totalCount)
        setLoading(false)
      }
    })
  }
  useEffect(() => {
    setLoading(true)
    fetchData()
  }, [page, pageSize, limit, params])


  const columns = [
    {title: 'ID', dataIndex: 'id'},
    {
      title: '类型',
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
      title: '版本',
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
    // {title: '针对船舶', dataIndex: 'ship'},
    {title: '收件邮箱', dataIndex: 'receiveEmail', render: (text: any) => text ? <span> {text} </span>: '-'},
    {
      title: '状态',
      dataIndex: 'isSend',
      render: (index: number) => {
        const obj = {
          0: {text: '待审核', status: 'warning'},
          1: {text: '已发送', status: 'success'},
          2: {text: '失败', status: 'error'},
        }
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const {text, status} = obj[index]
        return <Badge status={status} text={text}/>
      },

    },
    {title: '触发时间', dataIndex: 'createTime', render: (text: any) => text ? <span> {text} </span>: '-'},
    {title: '发送邮箱', dataIndex: 'sendEmail', render: (text: any) => text ? <span> {text} </span>: '-'},
    {title: '发送时间', dataIndex: 'sendTime', render: (text: any) => text ? <span> {text} </span>: '-'},
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      render: ({id}: any, item: any) => (
        <>
          <a onClick={() => {
            setVisible(true)
            console.log(item, JSON.stringify(item, null, 2))
            setDescribe(item)
          }}>查看</a>
          <Divider type="vertical"/>
          <a onClick={() => {
            // @ts-ignore
            props.history.push({
              pathname: "/mail/mailSend/EditEmailSend",
              query: {id}
            })

          }}>编辑</a>
          <Divider type="vertical"/>
          <DeleteButton onOk={() => {
            dispatch!({
              type: 'mail/deleteSendEmail',
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

    // @ts-ignore
    props.history.push({
      path: 'mail/mailSend',
      query: {
        page: pageIndex,
        pageSize: size
      }
    })
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

  const emailObj = {
    0: '待审核',
    1: '已发送',
    2: '失败',
  }

  return (
    <PageContainer
    >
      <div className="content_wrapper">
        <Search
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
            loading={loading}
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

      <Modal centered width={1200} visible={visible} getContainer={false} title="邮件内容" onCancel={() => setVisible(false)} footer={false}>
        {
          describe && Object.keys(describe).length &&
          <Descriptions
            bordered={true}
            column={2}
            size="middle">
            <Descriptions.Item label="发送邮箱">{describe.sendEmail}</Descriptions.Item>
            <Descriptions.Item label="收件邮箱">{describe.receiveEmail}</Descriptions.Item>
            <Descriptions.Item label="邮件标题">{describe.title}</Descriptions.Item>
            <Descriptions.Item label="邮件内容">
              <span dangerouslySetInnerHTML={{__html: describe.content||'-'}}/>
            </Descriptions.Item>
            <Descriptions.Item label="附件内容">{describe.enclosure|| '-'}</Descriptions.Item>
            <Descriptions.Item label="邮件类型">{typeObj[describe.type]}</Descriptions.Item>
            <Descriptions.Item label="邮件版本">{editionObj[describe.edition]}</Descriptions.Item>
            <Descriptions.Item label="邮件状态">{emailObj[describe.isSend || '-']}</Descriptions.Item>
            <Descriptions.Item label="发送时间">{describe.sendTime|| '-'}</Descriptions.Item>
          </Descriptions>
        }
        <Row justify="center" style={{marginTop: '20px'}} >
          <Space>
            <Button
              disabled={describe&&describe.isSend==1}
              loading={sendLoading} size="large"  onClick={()  => {
              setSendLoading(true)
              dispatch!({
                type: 'mail/sendEmail',
                payload: { id: describe.id, sendEmail: describe.sendEmail },
              }).then((res: any)  => {
                if (res.msg === 'success' || res.code === 0) {
                  fetchData()
                  message.success(`发送成功`);
                } else {
                  message.warning(`${res.msg}`);
                }
                setVisible(false)
                setSendLoading(false)
              })
            }} type="primary">发送</Button>
          </Space>
        </Row>
      </Modal>
    </PageContainer>
  )
}

export default connect()(MailSend)
