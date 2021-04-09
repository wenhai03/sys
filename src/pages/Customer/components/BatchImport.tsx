import React, {useState} from 'react';
import {Modal, Upload, Alert, Button, message} from "antd";
import {DownloadOutlined, UploadOutlined} from '@ant-design/icons'
import {serverUrl} from "@/utils/utils";

const BatchImport = (props: any) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = ({file}: any) => {
    if (file.status !== 'uploading') {
      console.log('当前正在上传中~~', file);
    }
    setLoading(true)
    if (file.status === 'done') {
      if (file.response.code === 0) {
        Modal.success({
          content: `${file.response.msg}`,
        });
        props.onOk()
        setVisible(false)
        setLoading(false)
      } else {
        message.error(`${file.response.msg}`);
        setLoading(false)
      }
    }
    if (file.status === 'error') {
      console.log('导入失败 -> ', file)
    }

  }
  return (
    <>
    <Button onClick={() => {
      setVisible(true)
    } } type="primary">批量导入</Button>

      <Modal visible={visible} title="批量导入" onCancel={()=> setVisible(false)}
             footer={
               <div style={{padding: '10px 0 '}}>
                 <Upload
                   action={`${serverUrl}/api/importCompany`}
                   showUploadList={false}
                   onChange={onChange}
                   style={{width: '100%'}}
                 >
                   <Button type="primary" icon={<UploadOutlined />} loading={loading}>上传文件</Button>
                 </Upload>
               </div>
             }
      >
        <Alert message="请下载模板文件，根据模板文件填充数据，然后上传" type="warning" showIcon />
        <br/>
        <Button onClick={() => window.open(`${serverUrl}/api/downloadCompanyTemplate`)} type="link" icon={<DownloadOutlined />}>
          下载模板文件
        </Button>
      </Modal>
    </>

  );
};

export default BatchImport
