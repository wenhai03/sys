import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal, Form, Col, Row, Tooltip } from 'antd';
import DatePickerTime from '@/components/DatePickerTime';

const EditTime = (props: any) => {
  const { dispatch, onOK, nextMonitorTime, id} = props;
  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();

  // 当前选中改变之后重新设置表单显示的默认数据
  useEffect(() => {
    if (nextMonitorTime) {
      form.setFieldsValue({ nextMonitorTime })
    }
  }, [nextMonitorTime]);
  const onCancel = () => {
    setVisible(false)
  };

  const onFinish = () => {
    form.validateFields().then((values) => {
      const params = {...values, id}
      dispatch({
        type: 'monitor/updateMonitor',
        payload: params,
        callback: () => {
          setVisible(false)
          onOK()
        }
      });
    });
  };

  return (
    <div>
      <Tooltip placement="topLeft" title="编辑下次监控时间">
        <a onClick={() => { setVisible(true) }}>编辑</a>
      </Tooltip>

      <Modal visible={visible} title="修改时间" onCancel={onCancel} onOk={onFinish}>
        <Form onFinish={onFinish} form={form}>
          <Row>
            <Col>
              <Form.Item label="下次监控时间" name="nextMonitorTime" rules={[{ required: true, message: '请输入时间' }]}>
                <DatePickerTime style={{width: 300}} format="YYYY-MM-DD HH:mm:ss" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

// @ts-ignore
export default connect()(EditTime);
