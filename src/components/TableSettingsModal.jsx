import React, { useState, useEffect } from 'react'

const TableSettingsModal = ({
  show,
  onClose,
  columns,
  filters,
  setFilters,
  sortConfig,
  setSortConfig
}) => {

  const [localFilters, setLocalFilters] =
    useState(filters)

  const [localSort, setLocalSort] =
    useState(sortConfig)

  useEffect(() => {
    setLocalFilters(filters)
    setLocalSort(sortConfig)
  }, [filters, sortConfig])

  if (!show) return null

  const applySettings = () => {
    setFilters(localFilters)
    setSortConfig(localSort)
    onClose()
  }

  const resetSettings = () => {

    const emptyFilters = {}

    columns.forEach(col => {
      emptyFilters[col.key] = ''
    })

    setLocalFilters(emptyFilters)

    setLocalSort({
      key: '',
      direction: 'asc'
    })
  }

  return (
    <div
      className="modal d-block"
      style={{
        background: 'rgba(0,0,0,0.4)'
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5>Table Settings</h5>

            <button
              className="btn-close"
              onClick={onClose}
            />
          </div>

          <div className="modal-body">

            <h6>Filters</h6>

            {columns.map(col => (
              <div
                className="mb-2"
                key={col.key}
              >
                <label>
                  {col.label}
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={
                    localFilters[col.key] || ''
                  }
                  onChange={(e) =>
                    setLocalFilters(prev => ({
                      ...prev,
                      [col.key]: e.target.value
                    }))
                  }
                />
              </div>
            ))}

            <hr />

            <h6>Sorting</h6>

            <div className="mb-2">
              <label>Field</label>

              <select
                className="form-select"
                value={localSort.key}
                onChange={(e) =>
                  setLocalSort(prev => ({
                    ...prev,
                    key: e.target.value
                  }))
                }
              >
                <option value="">
                  Select Field
                </option>

                {columns.map(col => (
                  <option
                    key={col.key}
                    value={col.key}
                  >
                    {col.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Direction</label>

              <select
                className="form-select"
                value={localSort.direction}
                onChange={(e) =>
                  setLocalSort(prev => ({
                    ...prev,
                    direction: e.target.value
                  }))
                }
              >
                <option value="asc">
                  Ascending
                </option>

                <option value="desc">
                  Descending
                </option>
              </select>
            </div>

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={resetSettings}
            >
              Reset
            </button>

            <button
              className="btn btn-primary"
              onClick={applySettings}
            >
              Apply
            </button>

          </div>

        </div>
      </div>
    </div>
  )
}

export default TableSettingsModal