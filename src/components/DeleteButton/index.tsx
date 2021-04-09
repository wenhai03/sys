import React from "react";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {Button, message, Modal} from "antd";

const {confirm} = Modal

function DeleteButton({onOk, tag, beforeDel= () => true, onCancel = () => { }, contentTxt='是否删除 ...', text, ...props}: any) {
  return (
    <>
      {tag === 'button' ?
        <Button
          onClick={() => {
            const isConfirm = beforeDel()
            if (isConfirm) {
              confirm({
                title: '删除',
                icon: <ExclamationCircleOutlined/>,
                content: `${contentTxt}`,
                okText: '确认',
                cancelText: '取消',
                onOk,
                onCancel
              })
            }
          }}
          size="small"
          {...props}
        >
          {text || '删除'}
        </Button>
        :
        <a
          onClick={() => {
            confirm({
              title: '删除',
              icon: <ExclamationCircleOutlined/>,
              content: `${contentTxt}`,
              okText: '确认',
              cancelText: '取消',
              onOk
            });
          }}
        >
          {text || '删除'}
        </a>}
    </>
  )
}


export default DeleteButton
