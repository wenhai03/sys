import React from "react";
import {Button, message} from "antd";
import {getToken, serverUrl} from "@/utils/utils";

function BatchExport(props: any) {
  // hasList：父组件传递的list数据，为了空说明table没有数据
  // selectedRowKeys
  const {selectedRowKeys=[], isAll=false,hasList=[], text='批量', filename='文件导出.xls', url='', callBack=()=>{}} = props
  return (
    <>
      <Button onClick={() =>  {
        if (!hasList.length) return message.warning(`暂无导出数据`)
        if (!selectedRowKeys.length && !isAll) return message.warning(`请选择导出数据`)
        if (!url) return message.warning(`导出地址异常`)

        fetch(`${serverUrl}/api/${url}`, {
          method: "POST",
          body: JSON.stringify(selectedRowKeys),
          headers: {
            token: getToken(),
            "Content-Type": 'application/json;charset=UTF-8'
          }
        }).then((res: any) => res.blob()).then(res => {
          const {type} = res
          // type = application/json说明文件是下载错误的
          if (type === 'application/json') {
            message.warning(`${text}导出失败!`)
            return
          }
          const hrefUrl = window.URL.createObjectURL(res);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.href = hrefUrl;
          a.download = filename;
          a.click();
          message.success(`${text}导出成功`)
          callBack()
        })
      }} type="primary">{`${text}导出`}</Button>
    </>
  )
}


export default BatchExport
