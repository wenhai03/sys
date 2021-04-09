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

  useEffect(() => {
    console.log('shipList 000000 -> ', shipList)
    console.log('shipType -> ', shipType)
    dispatch!({
      type: 'data/loadData',
      payload: {
        page: 1,
        pageSize: 10,
        limit: 10
      }
    })
  }, [])

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
        <Col>
          <Row gutter={16}>
            <Form.Item name={`${selectKey}`}>
              <Input.Group compact>
                <div style={{display: 'flex', width: '400px'}}>
                  <Select
                    placeholder="请先选择类型"
                    value={selectKey}
                    style={{width: '150px', marginRight: 10}}
                    onChange={(val: any) => {
                      if (!val) {
                        setSelectKey('请先选择类型 ')
                      } else {
                        setSelectKey(val.trim())
                      }
                    }}
                    allowClear
                  >

                    {needSelect.map((item: any) => (
                      <Option value={item.value} key={item.value}>{item.label}</Option>
                    ))}

                  </Select>
                  <Input onChange={(e) => {
                    if (selectKey === '请先选择类型') {
                      message.warning(`请先选择类型`)
                    } else {
                      form.setFieldsValue({
                        [selectKey]: e.target.value.trim()
                      })
                    }

                  }} placeholder="请输入关键词" allowClear style={{width: '250px'}}/>
                </div>
              </Input.Group>
            </Form.Item>
            <>
              <Col>
                <Form.Item name={`${selectShipKey}`}>
                  <Input.Group compact>
                    <Select
                      value={selectShipKey}
                      onChange={(val: any) => {
                        if (val === '请先选择类型') {
                          setShipSelectKey('请先选择类型')
                        } else {
                          setShipSelectKey(val)
                          form.setFieldsValue({
                            [val]: true
                          })
                        }
                      }}
                      allowClear
                      style={{width: 120}}>
                      <Option key="totalTons" value="totalTons">总吨</Option>
                      <Option key="netTons" value="netTons">净吨</Option>
                      <Option key="dwt" value="dwt">载重吨</Option>
                      <Option key="length" value="length">船长</Option>
                      <Option key="width" value="width">船宽</Option>
                      <Option key="draft" value="draft">吃水</Option>
                    </Select>
                  </Input.Group>

                </Form.Item>
              </Col>
              <Col>
                <Form.Item name="big">
                  <InputNumber style={{width: 120, textAlign: 'center'}} placeholder="选择最小值"/>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="~" name="small" colon={false}>
                  <InputNumber style={{width: 120, textAlign: 'center'}} placeholder="选择最大值"/>
                </Form.Item>
              </Col>
            </>

            <Col>
              <Form.Item label="有邮箱" name="isEmail">
                <Checkbox onChange={(e) => {
                  const {checked} = e.target
                  form.setFieldsValue({
                    isEmail: checked
                  })
                }}/>
              </Form.Item>
            </Col>

            <Col>
              <Form.Item label="有MMSI" name="isMMSI">
                <Checkbox onChange={(e) => {
                  const {checked} = e.target
                  form.setFieldsValue({
                    isMMSI: checked
                  })
                }}/>
              </Form.Item>
            </Col>

            <Col>
              <Form.Item label="船舶状态" name="shipStatus">
                <Select placeholder="请选择" allowClear style={{width: '150px'}}>
                  <Option value={0} key={0}>运营</Option>
                  <Option value={1} key={1}>拆船</Option>
                  <Option value={2} key={2}>在建</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col>
              <Form.Item label="船类型" name="type">
                <Select
                  onChange={(val: any) => {
                    setShipSelectType(val)
                  }} value={selectShipType} mode="multiple" placeholder="请选择" allowClear style={{width: '320px'}}>
                  { shipList && shipList.length && shipList.map((item: any) => (
                    <Option value={item.type} key={item.type}>{item.type}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col>
              <Form.Item label="监控状态" name="isMonitor">
                <Select placeholder="请选择" allowClear style={{width: '150px'}}>
                  <Option value={1} key={1}>监控中</Option>
                  <Option value={0} key={0}>未监控</Option>
                </Select>
              </Form.Item>
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

