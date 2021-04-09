import React, {useEffect, useState} from 'react'
import {Button, Input, InputNumber} from 'antd'


export default function InputNum(props: any) {
  console.log('InputNum props -> ', props)
  useEffect(() => {

  }, [props.value])
  return (
    <>
      <Input.Group compact>
        <InputNumber onChange={(val) => {
          props.onChange(val)
        }} value={props.value} precision={0} min={0} max={10000} step={1} style={{width: '80%'}} placeholder="请选择"/>

        {props.suffixText && <Button type='default' style={{width: '20%', cursor: 'default'}}>{props.suffixText}</Button>}
      </Input.Group>
    </>
  )
}
