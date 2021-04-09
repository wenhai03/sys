import React, {useState} from 'react'
import {message, Upload, Form} from 'antd'
import {resetImgUrl, serverUrl} from '@/utils/utils'

import {LoadingOutlined, PlusOutlined} from '@ant-design/icons'

import {RcFile} from 'antd/lib/upload/interface'
import {UploadChangeParam} from "antd/es/upload";


const UploadImage = (props: { coverImage: string, setCoverImage: Function }) => {
  const {coverImage, setCoverImage} = props
  const [isLoading, setIsLoading] = useState(false)

  console.log('coverImage -> ', coverImage)
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('你只能上传png或者jpg格式的图片')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片超过2m，请重新上传')
    }

    return isJpgOrPng && isLt2M
  }

  const uploadButton = (
    <div>
      {isLoading ? <LoadingOutlined/> : <PlusOutlined/>}
      <div style={{margin: 8}}>Upload</div>
    </div>
  )

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setIsLoading(true)
      return;
    }

    if (info.file.status === 'done') {
      setCoverImage(info.file.response.fileName)
      setIsLoading(false)
    }
  }

  return (
    <Form.Item
      label="图片"
    >
      <Upload
        name="file"
        listType="picture-card"
        showUploadList={false}
        action={`${serverUrl}/api/v1/common/upload_file`}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {coverImage ? <img style={{width: '128px',height: '128px'}} src={resetImgUrl(coverImage)} alt="图片"/> : uploadButton}
      </Upload>
    </Form.Item>
  )
}

export default UploadImage
