import React, {useEffect, useState} from 'react';
import UploadImage from '@/components/UploadImage'
import {connect} from 'umi'
import {Modal, Form, Input} from "antd";


const EditForm = (props: any) => {
  const {showEdit, dispatch, model, isEdit} = props
  const [coverImage, setCoverImage] = useState('');
  const [form] = Form.useForm();

  // 当前选中改变之后重新设置表单显示的默认数据
  useEffect(() => {
    form.setFieldsValue(model)
    setCoverImage(model.coverImage)
  }, [model])
  const onCancel = () => {
    dispatch({
      type: 'movieCategory/save',
      payload: {
        current: {},
        showEdit: false,
        isEdit: false,
      }
    })
  }

  const onFinish = () => {
    form.validateFields().then((values) => {
      const params = {...values, coverImage}
      if (isEdit) {
        dispatch({
          type: 'movieCategory/update',
          payload: {
            id: model.id,
            data: params
          }
        })
      } else {
        dispatch({
          type: 'movieCategory/insert',
          payload: params
        })
      }
    })
  }

  return (
    <Modal visible={showEdit} getContainer={false} title="编辑" onCancel={onCancel} onOk={onFinish}>
      <Form labelCol={{span: 4}} onFinish={onFinish} form={form}>
        <Form.Item label="名字" name="name" rules={[{required: true, message: '请输入名字'}]}>
          <Input placeholder="请输入分类名字"/>
        </Form.Item>

        <UploadImage coverImage={coverImage} setCoverImage={setCoverImage}/>

        <Form.Item label="简介" name="desc" rules={[{required: true, message: '请输入简介'}]}>
          <Input placeholder="请输入简介"/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state: any) => ({
  model: state.movieCategory.current,
  showEdit: state.movieCategory.showEdit,
  isEdit: state.movieCategory.isEdit,
})

export default connect(mapStateToProps)(EditForm);
