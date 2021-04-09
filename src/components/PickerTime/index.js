import React, {useEffect, useState} from 'react'
import moment from 'moment'
import {TimePicker} from 'antd'


export default function PickerTime(props) {
  const [defaultValue, setDefaultValue] = useState('')
  useEffect(() => {
    if (props.value) setDefaultValue(moment(props.value, 'HH:mm:ss'))
    if (props.value === 'Invalid date') setDefaultValue('')
  }, [props.value])
  return (
    <>
      <TimePicker
        placeholder="请选择日期"
        defaultValue={defaultValue}
        value={defaultValue}
         onChange={(value) => {
          const time = moment(value).format('HH:mm:ss')
          props.onChange(time)
        }}
        style={{width: '100%'}}
      />
    </>
  )
}
