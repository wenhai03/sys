import React, {useEffect, useState} from 'react';
import {connect} from 'umi'
import {Modal, Upload, Alert, Button, message} from "antd";
import {DownloadOutlined, UploadOutlined} from '@ant-design/icons'
import {RcFile} from "antd/lib/upload";

const BatchImport = (props: any) => {
  const {dispatch, model, importVisible} = props
  const [loading, setLoading] = useState(false);

  const onImport = (file: RcFile) => {
    setLoading(true)
    dispatch({
      type: 'ship/importShip',
      payload: file
    }).then((res: any) => {
      if (res.msg === 'success' || res.code === 0) {
        Modal.success({
          content: `${res.msg}`,
        });
      } else {
        message.warning(`${res.msg}`);
      }

      setLoading(false)

    })
  }

  const onChange = (info: any) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {

    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 导入失败`);
    }
  }

  // @ts-ignore
  return (
    <>
    <Button onClick={() => {
      setLoading(false)
      dispatch({
        type: 'ship/save',
        payload: {
          importVisible: true
        }
      })
    } } type="primary">批量导入</Button>

      <Modal visible={importVisible} getContainer={false} title="批量导入" onCancel={() => {
        dispatch({
          type: 'ship/save',
          payload: {
            importVisible: false
          }
        })
      }}
             footer={
               <div style={{padding: '10px 0 '}}>
                 <Upload beforeUpload={onImport} showUploadList={false} onChange={onChange} style={{width: '100%'}}>
                   <Button block type="primary" loading={loading} icon={<UploadOutlined />}>上传文件</Button>
                 </Upload>
               </div>
             }
      >
        <Alert message="请下载模板文件，根据模板文件填充数据，然后上传" type="warning" showIcon />
        <br/>
        <Button onClick={() => window.open('http://192.168.18.123:8081/ship/api/downloadShipTemplate')} type="link" icon={<DownloadOutlined />}>
          下载模板文件
        </Button>
      </Modal>
    </>

  );
};

// @ts-ignore
const mapStateToProps = (state: any) => ({
  importVisible: state.ship.importVisible
})

// @ts-ignore
export default connect(mapStateToProps)(BatchImport);
