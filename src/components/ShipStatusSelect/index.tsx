import React from "react";
import { Select } from "antd";



const {Option} = Select

function ShipStatusSelect({value, onChange, style}:any) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    <Select defaultValue={!value ?  0 : value} onSelect={(val) => {onChange && onChange(val)}} style={style}>
      <Option value={0}>请选择</Option>
      <Option value={2}>运营</Option>
      <Option value={1}>停靠</Option>
    </Select>
  )
}

export default ShipStatusSelect
