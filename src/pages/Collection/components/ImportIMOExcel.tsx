import React, {} from 'react';
import {connect} from 'umi'
import {Alert, Button, message, Modal, Upload} from "antd";
import {RcFile} from 'antd/lib/upload';
import { UploadOutlined} from "@ant-design/icons";

const CollectNow = (props: any) => {
  const {dispatch, importVisible} = props

  const onCancel = () => {
    dispatch({
      type: 'collection/save',
      payload: {
        importVisible: false
      }
    })
  }

  const onImport = (file: RcFile) => {
    dispatch({
      type: 'collection/importImo',
      payload: file
    })
  }

  const onChange = (info: any) => {
    if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      // message.success(`${info.file.name} 导入成功`);
      // setVisible(false)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 导入失败`);
    }
  }

  // @ts-ignore
  return (
    // @ts-ignore
    <>
      <Button
        onClick={() => {
          dispatch({
            type: 'collection/save',
            payload: {
              importVisible: true
            }
          })
        }}
        type="primary"
      >
        导入IMO文件
      </Button>
      <Modal
        title="导入IMO文件"
        visible={importVisible}
        getContainer={false}
        onCancel={onCancel}
        footer={
          <div style={{padding: '10px 0 '}}>
            <Upload beforeUpload={onImport} onChange={onChange} style={{width: '100%'}}>
              <Button block type="primary" icon={<UploadOutlined/>}>上传文件</Button>
            </Upload>
          </div>
        }
      >
        <Alert message="根据IMO填充数据，然后上传" type="warning" showIcon/>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  showCollectNow: state.collection.showCollectNow,
  importVisible: state.collection.importVisible
})

export default connect(mapStateToProps)(CollectNow);
