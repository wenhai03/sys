import React from "react";
import { Select } from "antd";

const {Option} = Select

function StatusSelect({value, onChange, style, selectData}:any) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    <Select defaultValue={!value ?  0 : value} onSelect={(val) => {onChange && onChange(val)}} style={style}>

      { selectData && selectData.map(item => (
        <Option key={item.value}>{item.label}</Option>
      ))}
      {/* <Option value={0}>请选择</Option>
      <Option value={2}>正常</Option>
      <Option value={1}>删除</Option> */}
    </Select>
  )
}

export default StatusSelect
``
