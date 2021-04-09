import React, {useEffect, useState} from 'react';
import {connect} from 'umi'
import {Modal, Form, Input, Row, Col, Radio, Select} from "antd";
import InputNum from '@/components/InputNum'
import DatePickerTime from '@/components/DatePickerTime'

const {Option} = Select
const AddForm = (props: any) => {
  const {dispatch, model, addVisible, list, page=1, pageSize=10, sortedInfo, company} = props
  const [defaultValue, setDefaultValue] = useState({});

  useEffect(() => {
    dispatch({
      type: 'ship/getCompanyNameList',
      payload: {}
    })
  }, [])

  const [form] = Form.useForm();

  useEffect(() => {
    if (Object.keys(model).length) {
      form.setFieldsValue(model)
      setDefaultValue({label: model.company, key: model.companyId})

    } else {
      form.resetFields()
      setDefaultValue({})
    }

  }, [model])
  const onCancel = () => {
    dispatch({
      type: 'ship/save',
      payload: {
        addVisible: false,
        current: {}
      }
    })
    form.resetFields()
  }

  const onFinish = () => {
    form.validateFields().then((values) => {
      const updateObj = {
        type: 'ship/update',
        payload: {...values, id: model.id, customer: defaultValue},
        callback: () => {
          // const {columnKey='create_time', order='false'} = sortedInfo
          // dispatch!({
          //   type: 'ship/loadData',
          //   payload: {page, pageSize, company, limit: pageSize, sort: order, sortValue: columnKey}
          // })
        }
      }

      const addObj = {
        type: 'ship/insert',
        payload: {...values, customer: defaultValue},
      }
      // 有id说明是编辑，否则新增
      dispatch(Object.keys(model).length ? updateObj : addObj).then((res: boolean) => {
        if(res) props.onOK()
      })
    })
  }

  function onChange(value: any) {
    setDefaultValue(value)
  }

  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
  }

  function onSearch(val: any) {
    console.log('search:', val);
  }

  return (
    <>
      <Modal centered width={800} visible={addVisible} getContainer={false}
             title={`${Object.keys(model).length ? '编辑' : '添加'}船舶`} onCancel={onCancel} onOk={onFinish}>
        <Form labelCol={{span: 8}} onFinish={onFinish} form={form}>
          <Row>
            <Col span={12}>
              <Form.Item label="IMO" name="imo" rules={[{required: true, message: '请输入IMO'}]}>
                <Input placeholder="请输入IMO"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="船舶名称" name="enName" rules={[{required: true, message: '请输入船舶名称'}]}>
                <Input placeholder="请输入船舶名称"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="中文名称" name="name">
                <Input placeholder="中文名称"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="国籍" name="shipNationality">
                <Input placeholder="请输入网址"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="船级社" name="classificationSociety">
                <Input placeholder="请输入船级社"/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="呼号" name="callSign">
                <Input placeholder="请输入呼号"/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="总吨" name="totalTons">
                <InputNum suffixText="吨"/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="净吨" name="netTons">
                <InputNum suffixText="吨"/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="载重吨" name="dwt">
                <InputNum suffixText="吨"/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="建造时间" name="createYear">
                <DatePickerTime format="YYYY-MM-DD" style={{width: '100%'}}/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="船长度" name="length">
                <InputNum suffixText="米"/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="船宽度" name="width">
                <InputNum suffixText="米"/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="吃水" name="draft">
                <InputNum suffixText="吨"/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="船类型" name="type">
                <Input placeholder="请输入船类型"/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="主机型号" name="mainEngine">
                <Input placeholder="请输入主机型号"/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="辅机型号" name="auxiliaryEngine">
                <Input placeholder="请输入辅机型号"/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="是否带克令吊数量" name="handlingEquipment">
                <Input placeholder="请输入装卸设备"/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="船舶状态" name="state">
                <Radio.Group>
                  <Radio value="0">运营</Radio>
                  <Radio value="1">拆船</Radio>
                  <Radio value="2">在建</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="邮箱" name="email">
                <Input placeholder="请输入邮箱"/>
              </Form.Item>
            </Col>

            <Col span={24} pull={4}>
              <Form.Item label="所属客户" name="customer">

                <Select
                  defaultValue={defaultValue}
                  showSearch
                  allowClear
                  labelInValue
                  style={{width: '100%', overflow: 'hidden'}}
                  placeholder="输入客户类型"
                  optionFilterProp="children"
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                >
                  {list.map((item: any) => (
                    <Option value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

// @ts-ignore
const mapStateToProps = (state: any) => ({
  addVisible: state.ship.addVisible,
  model: state.ship.current,
  list: state.ship.customerList,

})

// @ts-ignore
export default connect(mapStateToProps)(AddForm);
