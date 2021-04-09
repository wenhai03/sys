import React, { useState } from 'react';
import DatePickerTime from '@/components/DatePickerTime';
import { debounce } from '@/utils/utils'
import { Form, Input, Space, Button, InputNumber, Col, Row, Select, Checkbox, DatePicker, message } from 'antd';

const { Option } = Select;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Index({ onSearch, name, setName, searchValue, setSearchValue, resetSearch, needSelect, hasEmail = false, isEmail = false}: any) {
  const [form] = Form.useForm();
  // const [selectKey, setSelectKey] = useState('name');

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
              needSelect && <Form.Item name={`${name}`}>
                <Input.Group compact>
                  <div style={{ display: 'flex', width: '360px' }}>
                    <Select
                      placeholder="请先选择类型"
                      value={name}
                      style={{ width: '150px', marginRight: 10 }}
                      onChange={(val: any) => {
                        if (!val) {
                          setName('请先选择类型 ');
                        } else {
                          setName(val);
                        }
                      }}
                      allowClear
                    >

                      {needSelect.map((item: any) => (
                        <Option value={item.value} key={item.value}>{item.label}</Option>
                      ))}

                    </Select>
                    <Input
                      value={searchValue}
                      onChange={(e) => {
                      if (name === '请先选择类型') {
                        message.warning(`请先选择类型`);
                      } else {
                        const val = e.target.value.trim()
                        form.setFieldsValue({
                          [name]: val,
                        });
                        setSearchValue(val)
                        // // eslint-disable-next-line func-names
                        // debounce(function() {
                        //
                        // }, 200)
                      }
                    }}
                      placeholder="请输入关键词"
                      allowClear style={{ width: '250px' }}
                    />
                  </div>
                </Input.Group>
              </Form.Item>
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
