import { useEffect, useState } from "react"

const useDropdown = (apiMethod, params = {}, dependencies = []) => {

  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)

  const loadOptions = async () => {
    if (!apiMethod) return

    setLoading(true)
    const data = await apiMethod(params)
    setOptions(data)
    setLoading(false)
  }

  useEffect(() => {
    loadOptions()
  }, dependencies)

  return { options, loading, reload: loadOptions }
}

export default useDropdown