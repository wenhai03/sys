import React, {} from 'react'
import { Button, Row, Col, Space } from 'antd';

// import { Input, Select, Form, Button, Checkbox, DatePicker } from 'antd'


function FormSearch (props) {
  console.log('props11111111111-> ', props)
  console.log('props onSearch-> ', props.onSearch)
  const { children } = props
  return (
    <Row>
      <Col flex="auto">
        {children}
      </Col>
      <Col >
        <Space>
          <Button onClick={() => {
            console.log('2222 -> ', props.children)
            // props.onSearch()
          }} type="primary">查询</Button>
          <Button>重置</Button>
        </Space>
      </Col>
    </Row>
  )
}

export default FormSearch
