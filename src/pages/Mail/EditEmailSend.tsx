import React, {useEffect, useState} from 'react';
import {connect} from 'umi'
import {PageContainer} from '@ant-design/pro-layout'
import {Row, Radio, Button, Form, Input, Space, Card, message, Upload, Select} from "antd";
import BraftEditor from 'braft-editor'
// @ts-ignore
import {ContentUtils} from 'braft-utils'
import 'braft-editor/dist/index.css'
import {getToken, serverUrl, setFileName} from "@/utils/utils";
import {PictureOutlined, UploadOutlined} from "@ant-design/icons";
import {history} from "@@/core/history";

const {Option} = Select

// 这里没有新增的逻辑，所以不需要判断新增情况
const EditEmailSend = (props: any) => {
  const {dispatch} = props
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [emailList, setEmailList] = useState([]);

  const [imgUrl, setImgUrl] = useState(null);

  const {id} = props.location.query

  useEffect(() => {
    dispatch!({
      type: 'system/getEmailAccountList',
      callback: (list) => {
        setEmailList(list);
      },
    });
  }, []);

  useEffect(() => {
    if (id) {
      dispatch({
        type: 'mail/getSendEmailInfo',
        payload: {id},
        callback: (data) => {
          console.log('data -> ', data)
          const {type, edition, title} = data

          if (data.enclosure) {
            const r = data.enclosure.split(',').map((item: any, index: any) => {
              return {
                uid: index + 1,
                name: setFileName(item),
                status: 'done',
                url: item,
              }
            })
            setFileList(r)
          }
          form.setFieldsValue(data)
          form.setFieldsValue({
            type,
            edition,
            title,
            content: BraftEditor.createEditorState(data.content),
          })
        }
      })
    }
  }, [])

  useEffect(() => {
    if (imgUrl) {
      form.setFieldsValue({
        content: ContentUtils.insertMedias(form.getFieldValue('content'), [{
          type: 'IMAGE',
          url: imgUrl, // imgUrl 为上传成功后 后台返回的url地址
        }])
      })
    }
  }, [imgUrl])

  const onChangeBraft = (info: any) => {
    if (info.file.status === 'done' && info.file.response.msg === 'success') {
      if (info.file.response.code === 401) {
        message.success(`账号失效，请重新登录`);
        return history.push('/user/login')
      }

      if (info.file.response.code === 0 || info.file.response.msg === 'success') {
        const imageUrl = info.file.response.url
        if (form.getFieldValue('content')) {
          setImgUrl(imageUrl)
        }
      } else {
        message.success(`${info.file.response.msg}`);
      }
    }
  }

  const extendControls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link',
    {
      key: 'antd-uploader',
      type: 'component',
      component: (
        <Upload
          accept='image/*'
          showUploadList={false}
          action={`${serverUrl}/api/uploadImage`}
          headers={{"token": getToken()}}
          onChange={onChangeBraft}
        >
          <Button icon={<PictureOutlined/>} className='control-item button upload-button' data-title='插入图片'/>`
        </Upload>
      )
    }]

  const onFinish = () => {
    form.validateFields().then((values) => {
      let resUrl = ''
      if (fileList.length && typeof values.enclosure !== 'string') {
        resUrl = values.enclosure.fileList.map((item: any) => {
          if (item.response) {
            return item.response.url
          }
          return item.url
        }).join(',')
      }

      const updateObj = {
        type: 'mail/updateSendEmail',
        payload: {...values, content: values.content.toHTML(), id, enclosure: resUrl },
      }

      const addObj = {
        type: 'mail/insert',
        payload: {...values, content: values.content.toHTML(), enclosure: resUrl },
      }

      console.log('updateObj -> ', updateObj)
      // 有id说明是编辑，否则新增
      dispatch(id ? updateObj : addObj).then((res: any) => {
        if (res.msg === 'success' || res.code === 0) {
          message.success(`操作成功`);
          props.history.goBack()
        } else {
          message.warning(`${res.msg}`);
        }
      })
    })
  }

  const onChange = (info: any) => {
    if (info.file.status !== 'uploading'){
    }
    if (info.file.status === 'done') {
      setFileList(info.fileList)
      message.success(`${info.file.name} 文件上传成功`);
    } else if (info.file.status === 'error') {
      console.log('error -> ')
      message.error(`${info.file.name} 文件上传失败`);
    }
  }

  return (
    <PageContainer>
      <Card>
        <Form labelCol={{ span: 3 }} onFinish={onFinish} form={form}>
          <Form.Item label="发送邮箱" name="sendEmail" rules={[{ required: true, message: '请选择发送邮箱' }]}>
            <Select placeholder="请选择" allowClear style={{ width: '200px' }}>
              {emailList.map((email) => {
                  return <Option value={email.account}>{email.account}</Option>;
                })
              }
            </Select>
          </Form.Item>

          <Form.Item label="收件邮箱" name="receiveEmail" rules={[{ required: true, message: '请输入收件邮箱' }]}>
            <Input placeholder="请输入收件邮箱" />
          </Form.Item>

          <Form.Item label="邮件标题" name="title" rules={[{ required: true, message: '请输入邮件标题' }]}>
            <Input placeholder="请输入邮件标题" />
          </Form.Item>

          <Form.Item label="邮件内容" name="content" rules={[{ required: true, message: '请输入邮件内容' }]}>
            <BraftEditor
              style={{ border: '1px solid #d9d9d9', height: 350, overflow: 'auto' }}
              contentStyle={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)' }}
              extendControls={extendControls}
            />
          </Form.Item>

          <Form.Item label="附件内容" name="enclosure">

            <Upload
              name="file"
              fileList={fileList}
              action={`${serverUrl}/api/uploadEnclosure`}
              headers={{ 'token': getToken() }}
              onChange={onChange}
              style={{ width: '60%' }}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="邮件类型" name="type" rules={[{ required: true, message: '请输入客户名称' }]}>
            <Radio.Group onChange={() => {
            }} value={1}>
              <Radio value={0}>营销</Radio>
              <Radio value={1}>伙食</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="邮件版本" name="edition">
            <Radio.Group onChange={() => {
            }} value={1}>
              <Radio value={0}>简体</Radio>
              <Radio value={1}>繁体</Radio>
              <Radio value={2}>英文</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>

        <Row justify="center">
          <Space>
            <Button onClick={() => props.history.goBack()} type="default">返回</Button>
            <Button onClick={onFinish} type="primary">{id ? '保存' : '创建'}</Button>
          </Space>
        </Row>
      </Card>

    </PageContainer>
  );
};

const mapStateToProps = (state: any) => ({
  current: state.mail.current
})

export default connect(mapStateToProps)(EditEmailSend);
