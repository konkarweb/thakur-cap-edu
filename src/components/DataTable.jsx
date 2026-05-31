import React from 'react'
import TableActionHandler from './TableActionHandler'

const DataTable = ({
  columns = [],
  data = [],
  loading,
  actions = [],
  selectable = false,
  selectedRows = [],
  setSelectedRows,
}) => {

  if (loading) return <div>Loading...</div>
  if (!data.length) return <div className="text-muted">No data found</div>

  // ✅ Toggle single row
  const toggleRow = (row) => {
    const exists = selectedRows.includes(row)

    if (exists) {
      setSelectedRows(prev => prev.filter(r => r !== row))
    } else {
      setSelectedRows(prev => [...prev, row])
    }
  }

  // ✅ Toggle all
  const toggleAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(data)
    }
  }

  return (
    <div className="data-table-scroll">
      <table className="table table-bordered table-hover data-table table-sticky-first">
        
        {/* ================= HEADER ================= */}
        <thead className="table-light">
          <tr>

            {/* ✅ Checkbox Header */}
            {selectable && (
              <th style={{ width: '40px' }}>
                <input
                  type="checkbox"
                  checked={selectedRows.length === data.length && data.length > 0}
                  onChange={toggleAll}
                />
              </th>
            )}

            {columns.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}

            {actions.some(a => a.type === 'row') && (
              <th>Actions</th>
            )}
          </tr>
        </thead>

        {/* ================= BODY ================= */}
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>

              {/* ✅ Row Checkbox */}
              {selectable && (
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row)}
                    onChange={() => toggleRow(row)}
                  />
                </td>
              )}

              {columns.map(col => {
                const value = row[col.key]

                return (
                  <td
                    key={col.key}
                    onClick={() => col.onClick && col.onClick(row)}
                    style={{
                      cursor: col.onClick ? 'pointer' : 'default',
                    }}
                    className={col.onClick ? 'text-primary fw-semibold' : ''}
                  >
                    {col.render
                      ? col.render(value, row)
                      : value ?? '-'}
                  </td>
                )
              })}

              {/* ✅ ACTION COLUMN */}
              {actions.some(a => a.type === 'row') && (
                <td>
                  {actions
                    .filter(a => a.type === 'row')
                    .map((action, idx) => (
                      <button
                        key={idx}
                        className={action.className || 'btn btn-sm btn-primary me-2'}
                        onClick={() => TableActionHandler(action, row)}
                      >
                        {action.icon && <span className="me-1">{action.icon}</span>}
                        {action.label}
                      </button>
                    ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default DataTable