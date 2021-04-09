import React, {useState, useEffect} from 'react';
import {Form, Input, Space, Button, InputNumber, Col, Row, Select, Checkbox, DatePicker, message} from "antd";
import { connect } from 'umi';

const {Option} = Select

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Index({dispatch, shipList, value = false, shipType=false, onSearch, needShipSelect, needTime, resetSearch, needSelect, hasEmail = false, start_time = false, isEmail = false, status = false, state = false, isMonitor = false, small = false, big = false, dwt = false}: any) {
  const [form] = Form.useForm();
  const [selectKey, setSelectKey] = useState('请先选择类型');
  const [selectShipKey, setShipSelectKey] = useState('请先选择类型');
  const [selectShipType, setShipSelectType] = useState('请船类型');

  const onFinish = async () => {
    await form.validateFields().then((values) => {
      const params = {...values}

      console.log('params -> ', params)
      onSearch(params)
    })
  }
  return (
    <Form labelAlign="left" wrapperCol={{span: 8}} onFinish={onFinish} form={form}>
      <Row>
       <Col flex="auto">
         <Row gutter={16}>
           <Col>
             <Form.Item label="类型" name="type">
               <Select placeholder="请选择" allowClear style={{width: '200px'}}>
                 <Option value={0} key={0}>营销</Option>
                 <Option value={1} key={1}>伙食</Option>
               </Select>
             </Form.Item>
           </Col>

           <Col>
             <Form.Item label="版本" name="edition">
               <Select placeholder="请选择" allowClear style={{width: '200px'}}>
                 <Option value={0} key={0}>简体</Option>
                 <Option value={1} key={1}>繁体</Option>
                 <Option value={2} key={2}>英文</Option>
               </Select>
             </Form.Item>
           </Col>

           <Col>
             <Form.Item label="状态" name="isSend">
               <Select placeholder="请选择" allowClear style={{width: '200px'}}>
                 <Option value={0} key={0}>待审核</Option>
                 <Option value={1} key={1}>已发送</Option>
                 <Option value={2} key={2}>失败</Option>
               </Select>
             </Form.Item>
           </Col>

         </Row>
       </Col>

        <Col>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button htmlType="button" onClick={() => {
                form.resetFields()
                resetSearch()
                setSelectKey('请先选择类型')
                setShipSelectKey('请先选择类型')
              }}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default connect((state: any) => {
  const {data: {shipType}} = state
  return {
    shipList: shipType
  }
})(Index)

