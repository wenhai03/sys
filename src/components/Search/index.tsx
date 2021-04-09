import React, { useState } from 'react';
import DatePickerTime from '@/components/DatePickerTime';
import { Form, Input, Space, Button, InputNumber, Col, Row, Select, Checkbox, DatePicker, message } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Index({ value = false, onSearch, needShipSelect, needTime, resetSearch, needSelect, hasEmail = false, start_time = false, isEmail = false, status = false, state = false, isMonitor = false, small = false, big = false, dwt = false }: any) {
  const [form] = Form.useForm();
  const [selectKey, setSelectKey] = useState('name');
  const [selectTimeKey, setSelectTimeKey] = useState('请先选择类型');
  const [selectShipKey, setShipSelectKey] = useState('请先选择类型');

  const onFinish = () => {
    form.validateFields().then((values) => {
      const params = { ...values };
      onSearch(params);
    });
  };
  return (
    <Form labelAlign="left" wrapperCol={{ span: 8 }} onFinish={onFinish} form={form}>
      <Row>
        <Col flex="auto">
          <Row gutter={16}>
            {
              needSelect && <Form.Item name={`${selectKey}`}>
                <Input.Group compact>
                  <div style={{ display: 'flex', width: '360px' }}>
                    <Select
                      placeholder="请先选择类型"
                      value={selectKey}
                      style={{ width: '150px', marginRight: 10 }}
                      onChange={(val: any) => {
                        if (!val) {
                          setSelectKey('请先选择类型 ');
                        } else {
                          setSelectKey(val);
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
                        message.warning(`请先选择类型`);
                      } else {
                        form.setFieldsValue({
                          [selectKey]: e.target.value.trim(),
                        });
                      }

                    }} placeholder="请输入关键词" allowClear style={{ width: '250px' }} />
                  </div>
                </Input.Group>
              </Form.Item>
            }
            {
              needTime &&
              <Col>
                <Form.Item name={`${selectTimeKey}`}>
                  <Input.Group compact>
                    <div style={{ display: 'flex', width: '400px' }}>
                      <Select
                        placeholder="请先选择类型"
                        value={selectTimeKey}
                        style={{ width: '150px', marginRight: 10 }}
                        onChange={(val: any) => {
                          if (!val) {
                            setSelectTimeKey('请先选择类型 ');
                          } else {
                            setSelectTimeKey(val);
                          }
                        }}
                        allowClear
                      >

                        {needTime.map((item: any) => (
                          <Option value={item.value} key={item.value}>{item.label}</Option>
                        ))}

                      </Select>
                      <RangePicker
                        format="YYYY-MM-DD"
                        onChange={(dates, dateStrings) => {
                          console.log('dateStrings -> ', dateStrings);
                          if (selectTimeKey === '请先选择类型') {
                            message.warning(`请先选择类型`);
                          } else {
                            console.log('selectTimeKey -> ', selectTimeKey);
                            form.setFieldsValue({
                              [selectTimeKey]: { start: dateStrings[0], end: dateStrings[1] },
                            });
                          }

                        }}
                      />
                    </div>
                  </Input.Group>
                </Form.Item>
              </Col>
            }
            {
              needShipSelect && <>
                <Col>
                  <Form.Item name={`${selectShipKey}`}>
                    <Input.Group compact>
                      <Select
                        value={selectShipKey}
                        onChange={(val: any) => {
                          console.log('val -> ', val);
                          if (val === '请先选择类型') {
                            setShipSelectKey('请先选择类型');
                          } else {
                            setShipSelectKey(val);
                            form.setFieldsValue({
                              [val]: true,
                            });
                          }
                        }}
                        allowClear
                        style={{ width: 120 }}>
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
                    <InputNumber style={{ width: 120, textAlign: 'center' }} placeholder="选择最小值" />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label="~" name="small" colon={false}>
                    <InputNumber style={{ width: 120, textAlign: 'center' }} placeholder="选择最大值" />
                  </Form.Item>
                </Col>
              </>
            }
            {
              value && <Col>
                <Form.Item label="关键词" name="value">
                  <Input allowClear placeholder="请输入关键词" style={{ width: '150px' }} />
                </Form.Item>
              </Col>
            }

            {
              start_time && <Col>
                <Form.Item label="时间筛选" name="start_time">
                  <DatePickerTime format="YYYY-MM-DD" style={{ width: '200px' }} />
                </Form.Item>
              </Col>
            }


            {isEmail && <Col>
              <Form.Item label="有邮箱" name="isEmail">
                <Checkbox onChange={(e) => {
                  const { checked } = e.target;
                  form.setFieldsValue({
                    isEmail: checked,
                  });
                }} />
              </Form.Item>
            </Col>}

            {typeof status === 'boolean' && <Col>
              <Form.Item label="船舶状态" name="shipStatus">
                <Select placeholder="请选择" allowClear style={{ width: '150px' }}>
                  <Option value={0} key={0}>运营</Option>
                  <Option value={1} key={1}>拆船</Option>
                  <Option value={2} key={2}>在建</Option>
                </Select>
              </Form.Item>
            </Col>}

            {state && <Col>
              <Form.Item label="状态" name="state">
                <Select placeholder="请选择" allowClear style={{ width: '150px' }}>
                  {state && state.map((item: any) => (
                    <Option value={item.value} key={item.value}>{item.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>}

            {typeof status === 'object' && <Col>
              <Form.Item label="状态" name="status">
                <Select placeholder="请选择" allowClear style={{ width: '150px' }}>
                  {status && status.map((item: any) => (
                    <Option value={item.value} key={item.value}>{item.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>}

            {isMonitor && <Col>
              <Form.Item label="监控状态" name="isMonitor">
                <Select placeholder="请选择" allowClear style={{ width: '150px' }}>
                  <Option value={1} key={1}>监控中</Option>
                  <Option value={0} key={0}>未监控</Option>
                </Select>
              </Form.Item>
            </Col>}

            {
              dwt &&
              <>
                <Form.Item label="载重吨" name="small">
                  <InputNumber min={0} precision={0} max={1000000} style={{ width: '100px' }} />
                </Form.Item>

                <Form.Item label="~" colon={false} name="big">
                  <InputNumber precision={0} min={1} max={1000000} style={{ width: '100px' }} />
                </Form.Item>
              </>
            }

          </Row>
        </Col>
        <Col>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button htmlType="button" onClick={() => {
                form.resetFields();
                resetSearch();
                setSelectKey('name');
                setSelectTimeKey('请先选择类型');
                setShipSelectKey('请先选择类型');
              }}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default Index;
