import React, {useEffect} from 'react';
import {connect} from 'umi'
import {Modal, Form, Input, Row, Col} from "antd";

const AddForm = (props: any) => {
  const {dispatch, model, addVisible} = props

  const [form] = Form.useForm();

  // 当前选中改变之后重新设置表单显示的默认数据
  useEffect(() => {
    // form.setFieldsValue(model)
  }, [model])
  const onCancel = () => {
    dispatch({
      type: 'ship/save',
      payload: {
        addVisible: false,
        imo: ''
      }
    })
    form.setFieldsValue({imo: ''})
  }

  const onFinish = () => {
    form.validateFields().then((values) => {
      dispatch({
        type: 'ship/insert',
        payload: values,
      })
    })
  }
  批量导入

  return (
    <Modal width={800} visible={addVisible} getContainer={false} title="添加船舶" onCancel={onCancel} onOk={onFinish}>
      <Form labelCol={{span: 6}}  onFinish={onFinish} form={form}>
        <Row>
          <Col span={12}>
            <Form.Item label="IMO" name="imo" rules={[{required: true, message: '请输入IMO'}]}>
              <Input placeholder="请输入IMO"/>
            </Form.Item>
          </Col>

          {/* <Col span={12}>
            <Form.Item label="船舶公司" name="company" rules={[{required: true, message: '请输入船舶公司'}]}>
              <Input placeholder="请输入船舶公司"/>
            </Form.Item>
          </Col> */}
          <Col span={12}>
            <Form.Item label="船名" name="name" rules={[{required: true, message: '请输入船名'}]}>
              <Input placeholder="请输入船名"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="英文名称" name="enName" rules={[{required: true, message: '请输入英文名称'}]}>
              <Input placeholder="请输入英文名称"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="船籍" name="shipNationality" rules={[{required: true, message: '请输入网址'}]}>
              <Input placeholder="请输入网址"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="船级社" name="classificationSociety" rules={[{required: true, message: '请输入船级社'}]}>
              <Input placeholder="请输入船级社"/>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="呼号" name="callSign" rules={[{required: true, message: '请输入呼号'}]}>
              <Input placeholder="请输入呼号"/>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="总吨" name="totalTons" rules={[{required: true, message: '请输入总吨'}]}>
              <Input placeholder="请输入总吨"/>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="净吨" name="netTons" rules={[{required: true, message: '请输入净吨'}]}>
              <Input placeholder="请输入净吨"/>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="载重吨" name="dwt" rules={[{required: true, message: '请输入载重吨'}]}>
              <Input placeholder="请输入载重吨"/>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="建造时间" name="createYear" rules={[{required: true, message: '请输入建造时间'}]}>
              <Input placeholder="请输入建造时间"/>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="船长度" name="length" rules={[{required: true, message: '请输入船长度'}]}>
              <Input placeholder="请输入船长度"/>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="船宽度" name="width" rules={[{required: true, message: '请输入船宽度'}]}>
              <Input placeholder="请输入船宽度"/>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="吃水" name="draft" rules={[{required: true, message: '请输入吃水'}]}>
              <Input placeholder="请输入吃水"/>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="船类型" name="type" rules={[{required: true, message: '请输入船类型'}]}>
              <Input placeholder="请输入船类型"/>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="主机型号" name="mainEngine" rules={[{required: true, message: '请输入主机型号'}]}>
              <Input placeholder="请输入主机型号"/>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="辅机型号" name="auxiliaryEngine" rules={[{required: true, message: '请输入辅机型号'}]}>
              <Input placeholder="请输入辅机型号"/>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="状态" name="state" rules={[{required: true, message: '请输入邮箱'}]}>
              <Input placeholder="请输入状态"/>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="A8客户" name="company" rules={[{required: true, message: '请输入船舶公司(A8客户)'}]}>
              <Input placeholder="请输入船舶公司(A8客户)"/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

// @ts-ignore
const mapStateToProps = (state: any) => ({
  addVisible: state.ship.addVisible
})

// @ts-ignore
export default connect(mapStateToProps)(AddForm);
