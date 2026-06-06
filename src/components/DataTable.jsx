import React from 'react'
import TableActionHandler from './TableActionHandler'

const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  actions = [],
  selectable = false,
  selectedRows = [],
  setSelectedRows = () => {},
}) => {

  if (loading) return <div>Loading...</div>

  if (!data.length) {
    return <div className="text-muted">No data found</div>
  }

  // ================= ROW SELECT =================

  const toggleRow = (row) => {
    const exists = selectedRows.includes(row)

    if (exists) {
      setSelectedRows(prev => prev.filter(r => r !== row))
    } else {
      setSelectedRows(prev => [...prev, row])
    }
  }

  const toggleAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(data)
    }
  }

  const hasRowActions = actions.some(a => a.type === 'row')

  return (
    <div className="data-table-scroll">
      <table className="table table-bordered table-hover data-table">

        {/* ================= HEADER ================= */}

        <thead className="table-light">
          <tr>

            {selectable && (
              <th
                className="sticky-checkbox"
                style={{ width: '40px' }}
              >
                <input
                  type="checkbox"
                  checked={
                    selectedRows.length === data.length &&
                    data.length > 0
                  }
                  onChange={toggleAll}
                />
              </th>
            )}

            {columns.map((col, index) => (
              <th
                key={col.key}
                className={
                  index === 0
                    ? selectable
                      ? 'sticky-first-col'
                      : 'sticky-first-col-no-checkbox'
                    : ''
                }
              >
                {col.label}
              </th>
            ))}

            {hasRowActions && (
              <th>
                Actions
              </th>
            )}

          </tr>
        </thead>

        {/* ================= BODY ================= */}

        <tbody>

          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>

              {selectable && (
                <td className="sticky-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row)}
                    onChange={() => toggleRow(row)}
                  />
                </td>
              )}

              {columns.map((col, index) => {

                const value = row[col.key]

                const stickyClass =
                  index === 0
                    ? selectable
                      ? 'sticky-first-col'
                      : 'sticky-first-col-no-checkbox'
                    : ''

                const clickableClass =
                  col.onClick
                    ? 'text-primary fw-semibold'
                    : ''

                return (
                  <td
                    key={col.key}
                    className={`${stickyClass} ${clickableClass}`}
                    onClick={() =>
                      col.onClick && col.onClick(row)
                    }
                    style={{
                      cursor: col.onClick
                        ? 'pointer'
                        : 'default',
                    }}
                  >
                    {col.render
                      ? col.render(value, row)
                      : value ?? '-'}
                  </td>
                )
              })}

              {hasRowActions && (
                <td>
                  {actions
                    .filter(a => a.type === 'row')
                    .map((action, idx) => (
                      <button
                        key={idx}
                        className={
                          action.className ||
                          'btn btn-sm btn-primary me-2'
                        }
                        onClick={() =>
                          TableActionHandler(action, row)
                        }
                      >
                        {action.icon && (
                          <span className="me-1">
                            {action.icon}
                          </span>
                        )}

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