import React, {useEffect} from 'react'
import {connect, ConnectProps} from 'umi';
import {PageContainer} from '@ant-design/pro-layout'

import CollectParams from './components/CollectParams';
import MonitorParams from './components/MonitorParams';
import AutoEmail from './components/AutoEmail';
import MonitorFrequency from './components/MonitorFrequency';
import SystemParams from './components/SystemParams';


interface PageProps extends ConnectProps {
}

const Index: React.FC<PageProps> = (props) => {
  const {dispatch} = props
  useEffect(() => {
    dispatch!({
      type: 'system/loadSysParamsData',
      payload: {}
    })
  }, [])

  return (
    <PageContainer>
      <CollectParams/>
      <MonitorParams/>
      <AutoEmail/>
      <MonitorFrequency/>
      <SystemParams/>
    </PageContainer>
  )
}

export default connect((state: any) => {
  return {
    model: state.system.collectModel,
  }
})(Index)
