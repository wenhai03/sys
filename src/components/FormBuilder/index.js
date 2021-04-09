import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { Col, Form, Row, Tooltip, Button, } from 'antd'

const FormItem = Form.Item

const defaultFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
}

function pickProps (source, props) {
  const target = {}
  props.forEach(prop => {
    if (prop in source) target[prop] = source[prop]
  })
  return target
}

function Index ({meta}, ref) {
  // const formRef = useRef()
  /* useImperativeHandle(ref,() => {
    return {
      formDataPromise: () => {
        return formRef.current.validateFields()
      },
      fn: () => {
        console.log('哈哈哈 -> ')
      }
    }
  },[ref]) */

  const [form] = Form.useForm();

  const renderElement = element => {
    let formItemProps = {
      key: element.key,
      colon: meta.colon,
      ...(meta.formItemLayout || (element.label ? defaultFormItemLayout : null)),
      label: element.tooltip ? (
        <span>
            {element.label}
          <Tooltip title={element.tooltip} />
          </span>
      ) : (
        element.label
      ),
      ...pickProps(element, ['help', 'extra', 'labelCol', 'wrapperCol', 'colon', 'hasFeedback', 'validateStatus', 'hasFeedback']),
      ...element.formItemProps,
    }

    if (element.render) {
      return element.render.call(this, {
        formItemProps,
        element,
        // disabled,
      })
    }

    let rules = element.rules || []
    if (element.required) {
      rules = [
        ...rules,
        {
          required: true,
          message: `${element.label || element.key} `,
        },
      ]
    }
    const fieldProps = {
      ...pickProps(element, ['getValueFromEvent', 'normalize', 'trigger', 'valuePropName', 'validateTrigger', 'validateFirst']),
      rules,
      ...element.fieldProps,
    }

    const wp = element.widgetProps || {}
    const widgetProps = {
      ...pickProps(element, ['placeholder', 'type', 'className', 'class']),
      ...wp,
      // disabled: element.disabled || wp.disabled || disabled,
    }
    formItemProps = {...formItemProps, ...fieldProps}

    return (
      <div key={element.key}>
        <FormItem {...formItemProps} >
          <element.widget placeholder={`${element.placeholder}`} {...fieldProps} {...widgetProps}  >
            {element.children || null}
          </element.widget>

          {
            element.tip && <p style={{marginTop: 10, fontSize: 12, color: '#f50' }}>{element.tip}</p>
          }
        </FormItem>
      </div>
    )
  }

  const renderLayout = elements => {
    const columns = meta.columns || 1
    if (columns === 1) return elements
    const gutter = meta.gutter || 0
    const rows = []
    const colspan = 24 / columns
    for (let i = 0; i < elements.length; i += columns) {
      const cols = []
      for (let j = 0; j < columns; j += 1) {
        cols.push(
          <Col key={j} span={colspan.toString()}>
            {elements[i + j]}
          </Col>
        )
      }
      rows.push(
        <Row key={i} gutter={gutter}>
          {cols}
        </Row>
      )
    }
    return rows
  }

  const initialValue = meta.elements.reduce((pre, cur)=>{
    // eslint-disable-next-line no-param-reassign
    pre[cur.key] = cur.initialValue
    return pre
  }, {})

  const onFinish = () => {
    form.validateFields().then((values) => {
      console.log('values -> ', values)
    })
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
      // ref={ref}
    >
      {renderLayout(meta.elements.map(renderElement))}
      <Form.Item {...defaultFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={() => {

        }}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  )


}

export default forwardRef(Index)
