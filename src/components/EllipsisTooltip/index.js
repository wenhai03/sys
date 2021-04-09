import React, {useEffect, useRef, useState} from 'react'
import {Tooltip} from 'antd'

function EllipsisTooltip(props) {
  const {title} = props
  const [style, setStyle] = useState({})
  const ref = useRef()

  useEffect(() => {
    if(ref){
      setStyle({width:`${ref.current.clientWidth}px`})
    }
  }, [])

  return (
    <div className="tooltipWrapper">
      <Tooltip placement="topLeft" title={title} overlayClassName="tooltipCls">
        <div ref={ref} style={style} className="title">{title}</div>
      </Tooltip>
    </div>
  )
}

export default EllipsisTooltip
