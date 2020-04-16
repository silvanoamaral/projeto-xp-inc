import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetch = (url, initialValue) => {
  const [data, setData] = useState(initialValue)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axios.get(url)
        if (res.status === 200) {
          setData(res.data)
        }
      } catch (error) {
        throw error
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url])
  return { loading, data }
}

export default useFetch