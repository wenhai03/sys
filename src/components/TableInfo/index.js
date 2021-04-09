import React, { Fragment, useEffect, useState} from 'react'
import {Table, Modal, Input} from 'antd'

const { Search } = Input

function Index (props) {
  useEffect(() => {

  }, [])

  const onSelectChange = (key) => {
    console.log('key -> ', key)
  }

  const rowSelection = {
    selectedRowKeys: [],
    onChange: onSelectChange,
  }

  return (
    <Fragment>
      <Table
        scroll={{x: props.scroll}}
        rowKey={record => record.id}
        columns={props.columns}
        rowSelection={props.rowSelection}
        dataSource={props.dataSource}
      />

    </Fragment>
  )
}

export default Index
