import React, {useState, useEffect, useMemo} from 'react'

import {UploadOutlined} from '@ant-design/icons';
import {Upload, Button, message} from 'antd';
import {serverUrl, setFileName, getToken} from "@/utils/utils";

function Index(props: any) {
  console.log('props.value -> ', props.value)
  const [fileList, setFileList] = useState([]);
  /* useEffect(() => {
    if (props.value && props.value.length) {
      const r = props.value.split(',').map((item: any, index: any) => {
        return {
          uid: index + 1,
          name: setFileName(item),
          status: 'done',
          url: item,
        }
      })
      setFileList(r)
    }
  }, [props.value]) */
  // @ts-ignore
  /* let fileList = useMemo(() => {
    if (props.value) {
      const r = props.value.split(',').map((item: any, index: any) => {
        return {
          uid: index + 1,
          name: setFileName(item),
          status: 'done',
          url: item,
        }
      })
      return r
    }
    return []
  }, [props.value]) */


  const onRemove = (info: any) => {
    /* if (fileList.length) {
      const r = fileList.filter(item => item.uid !== info.uid)
      if (r.length) {
        props.onChange(r.map(item => item.url).join(','))
      }

      setFileList(r)
    } else {
      props.onChange('')
    } */

    const r = fileList.filter(item => item.uid !== info.uid)
    setFileList(r)
    console.log('info -> ', info)
    console.log('fileList -> ', fileList)
    // const r = fileList.map(item => item.uid !== info.uid)
    // console.log('r -> ', r)

    // props.onChange(fileList.map(item => item.uid !== info.uid))
    // console.log('fileList -> ', fileList)

    // props.onChange('')
  }
  const onChange = (info: any) => {
    if (info.file.status !== 'uploading') {
      // console.log('status !== uploading ', info.file, info.fileList);
      // console.log('info.fileList -> ', info.fileList)
      // setFileList(info.fileList)
      const resUrl = info.fileList.length && info.fileList.map(item => item.url) || ''
      props.onChange(resUrl)
    }
    if (info.file.status === 'done') {
      console.log('done -> ')
      message.success(`${info.file.name} 文件上传成功`);

      // const r = info.fileList.map(item => item.response.url).join(',')
      console.log('info.fileList -> ', info.fileList)
      // props.onChange(r)
      if (info.fileList.length) {
        const r = info.fileList.map(item => item.response.url).join(',')
        console.log('r -> ', r)

        // props.onChange('')
      } else {
        // props.onChange('')
      }

      /* let resUrl = ''
      if (fileList.length) {
        resUrl =  `${fileList.map(item => item.url).join(',')  },${  url}`
      } else {
        resUrl = url
      }


      props.onChange(resUrl) */
    } else if (info.file.status === 'error') {
      console.log('error -> ')
      message.error(`${info.file.name} 文件上传失败`);
    }

    // const resUrl = `${info.fileList.map(item => item.url).join(',')  }`

    // console.log('resUrl -> ', resUrl)

    // setFileList(info.fileList)
    // props.onChange(resUrl)

  }
  return (
    <Upload
      name="file"
      // defaultFileList={fileList}
      fileList={fileList}
      action={`${serverUrl}/api/uploadEnclosure`}
      headers={{"token": getToken()}}
      onChange={onChange}
      // onRemove={onRemove}
      style={{width: '60%'}}
    >
      <Button icon={<UploadOutlined/>}>Upload</Button>
    </Upload>
  )
}

export default Index;
