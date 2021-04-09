import React from "react";
import { Select } from "antd";

const {Option} = Select

function MonitorStatusSelect({value, onChange, style, selectData, placeholder}:any) {
  console.log('placeholder -> ', placeholder)
  return (
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    <Select placeholder={placeholder} onSelect={(val) => {onChange && onChange(val)}} style={style} allowClear>
      { selectData && selectData.map(item => (
        <Option key={item.value}>{item.label}</Option>
      ))}
    </Select>
  )
}

export default MonitorStatusSelect
