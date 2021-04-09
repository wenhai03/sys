import {useState, useEffect, useCallback} from 'react'
import {message} from 'antd'

const useFetch = ({url, config, watch, errorMsg, callback, deconstruct = true}) => {
  const [res, setData] = useState({})
  const [loading, setLoading] = useState(true)

  const deconstructFunc = useCallback(async () => {
    const {data, meta} = await request[url](config)
    if (meta.code === 200) {
      setData({data, meta})
      callback && callback({data, meta})
      setLoading(false)
    } else {
      setLoading(false)
      message.error(errorMsg || meta.msg)
    }
  }, [callback, config, errorMsg, url])

  const normalFunc = useCallback(async () => {
    const data = await request[url](config)
    setData(data)
    callback && callback(data)
    setLoading(false)
  }, [callback, config, url])

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      deconstruct ? deconstructFunc() : normalFunc()
    } catch (err) {
      setLoading(false)
    }
  }, [deconstruct, deconstructFunc, normalFunc])

  useEffect(() => {
      fetchData()
    },
    watch || [url, config])


  return {res, loading, reqFunc: fetchData, setData}
}


const usePagination = () => {
  const [pagination, setPagination] = useState({
    total: 1,
    pageSize: 10,
    current: 1,
    showSizeChanger: true,
    showQuickJumper: true,
  })
  const {current, pageSize} = pagination

  return {pagination, current, pageSize, setPagination}
}

export {useFetch, usePagination}
