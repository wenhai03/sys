import React from 'react'
import {Input, DatePicker} from 'antd'

import moment from 'moment'

export default function DatePickerTime(props) {
  const showTime = { defaultValue: moment(moment().format('HH:mm:ss')) }
  let defaultValue = ''
  if (props.value) defaultValue = moment(props.value)
  if (props.value === 'Invalid date') defaultValue = ''
  const format = props.format || 'YYYY-MM-DD HH:mm:ss'
  return (
    <>
      <Input.Group compact >
        <DatePicker
          placeholder="请选择日期"
          className="dy_datePicker"
          format={format}
          value={defaultValue}
          inputReadOnly
          showTime={showTime}
          onChange={(value) => {
            const time = moment(value).format(format)
            props.onChange(time)
          }}
          style={props.style}
        />
        {/* <Button type='primary' style={{width: 88}} onClick={() => {
          const time = moment().add('30','seconds').format('YYYY-MM-DD HH:mm:ss')
          props.onChange(time)
        }}>{props.addonAfterText}</Button> */}
      </Input.Group>
    </>
  )
}
