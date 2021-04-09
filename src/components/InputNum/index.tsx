import React, {useEffect} from 'react'
import {Button, Input, InputNumber} from 'antd'


export default function InputNum(props: any) {
  useEffect(() => {

  }, [props.value])

  return (
    <>
      <Input.Group compact>
        <InputNumber
          onChange={(val) => {
            props.onChange(val)
          }}
          value={props.value}
          style={{width: '80%'}}
          placeholder="请选择"
        />

        {props.suffixText &&
        <Button type='default' style={{width: '20%', cursor: 'default'}}>{props.suffixText}</Button>}
      </Input.Group>
    </>
  )
}
