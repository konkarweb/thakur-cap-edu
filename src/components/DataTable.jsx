import React from 'react'

const DataTable = ({ columns = [], data = [], loading }) => {
  if (loading) return <div>Loading...</div>
  if (!data.length) return <div className="text-muted">No data found</div>

  return (
    <div className="data-table-scroll">
      <table className="table table-bordered table-hover data-table table-sticky-first">
        <thead className="table-light">
          <tr>
            {columns.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable