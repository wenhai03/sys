import React, {useEffect, useState} from 'react'
import {Input, Select, InputNumber} from 'antd'

const {Option} = Select;

export default function SelectCompact(props: any) {
  const [selectKey, setSelectKey] = useState('请先选择类型');
  useEffect(() => {
  }, [props.value])
  return (
    <div style={{width: 360}}>
      <Input.Group compact>
        <Select style={{width: 90}}>
          <Option value="totalTons">总吨</Option>
          <Option value="netTons">净吨</Option>
          <Option value="dwt">载重吨</Option>
          <Option value="length">船长</Option>
          <Option value="width">船宽</Option>
          <Option value="draft">吃水</Option>
        </Select>
        <InputNumber style={{width: 120, textAlign: 'center'}} placeholder="选择最小值"/>
        <Input
          className="site-input-split"
          style={{
            width: 30,
            borderLeft: 0,
            borderRight: 0,
            pointerEvents: 'none',
          }}
          placeholder="~"
          disabled
        />
        <InputNumber
          className="site-input-right"
          style={{
            width: 120,
            textAlign: 'center',
          }}
          placeholder="选择最大值"
        />
      </Input.Group>
    </div>
  )
}
