import React, { useEffect, useRef, useState } from "react"

const DynamicFilter = ({ config = [], onSearch }) => {

  const [values, setValues] = useState({})
  const [options, setOptions] = useState({})
  const prevDeps = useRef({})

  const setFieldValue = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const loadOptions = async (field, parentValue = null) => {

    if (!field.api) return

    let data

    if (field.dependsOn) {
      data = await field.api(parentValue)
    } else {
      data = await field.api()
    }

    setOptions(prev => ({
      ...prev,
      [field.name]: data || []
    }))
  }

  /**
   * Load non dependent dropdowns
   */
  useEffect(() => {
    config.forEach(field => {
      if (field.type === "select" && !field.dependsOn) {
        loadOptions(field)
      }
    })
  }, [config])

  /**
   * Handle dependency dropdowns
   */
  useEffect(() => {

    config.forEach(field => {

      if (!field.dependsOn) return

      const parentValue = values[field.dependsOn]

      if (!parentValue) return

      if (prevDeps.current[field.name] === parentValue) return

      prevDeps.current[field.name] = parentValue

      loadOptions(field, parentValue)

      setValues(prev => ({
        ...prev,
        [field.name]: ""
      }))

    })

  }, [values, config])

  const handleSearch = () => {
    onSearch(values)
  }

  return (
    <div className="card p-3 mb-3">
      <div className="row g-2 align-items-end">

        {config.map(field => {

          const value = values[field.name] || ""

          return (
            <div key={field.name} className={field.col || "col-md-3"}>
              <label>{field.label}</label>

              {field.type === "text" && (
                <input
                  className="form-control"
                  placeholder={field.placeholder}
                  value={value}
                  onChange={(e) =>
                    setFieldValue(field.name, e.target.value)
                  }
                />
              )}

              {field.type === "select" && (
                <select
                  className="form-select"
                  value={value}
                  onChange={(e) =>
                    setFieldValue(field.name, e.target.value)
                  }
                >
                  <option value="">All</option>

                  {(options[field.name] || []).map(item => (
                    <option
                      key={item[field.valueKey]}
                      value={item[field.valueKey]}
                    >
                      {item[field.labelKey]}
                    </option>
                  ))}

                </select>
              )}

            </div>
          )
        })}

        <div className="col-md-2">
          <button
            className="btn btn-primary w-100"
            onClick={handleSearch}
          >
            Go
          </button>
        </div>

      </div>
    </div>
  )
}

export default DynamicFilter