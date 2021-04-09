import React, {useEffect} from 'react';
import {connect} from 'umi'
import {Modal, message, Button} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";

const { confirm } = Modal

const CollectNow = (props: any) => {
  const { dispatch, model, imo} = props

  return (
    <a
      onClick={() => {
        confirm({
          title: '立即采集',
          icon: <ExclamationCircleOutlined />,
          content: '立即执行采集任务吗？',
          onOk() {
            return dispatch!({
                type: 'collection/collectNow',
                payload: {imo},
                callback(){
                  props.callback()
                }
              }
            )
          },
        });
      }}
    >
      立即采集
    </a>
  );
};

const mapStateToProps = (state: any) => ({
  showCollectNow: state.collection.showCollectNow
})

export default connect(mapStateToProps)(CollectNow);
