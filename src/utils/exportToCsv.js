export const exportToCsv = (
  data = [],
  columns = [],
  fileName = 'Export'
) => {

  if (!data.length) {
    alert('No data available')
    return
  }

  const headers = columns.map(col => col.key)

  const rows = data.map(row =>
    columns.map(col => {

      const value = row[col.key]

      if (value === null || value === undefined) {
        return ''
      }

      return `"${String(value).replace(/"/g, '""')}"`
    })
  )

  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\n')

  const blob = new Blob(
    [csvContent],
    {
      type: 'text/csv;charset=utf-8;'
    }
  )

  const url = window.URL.createObjectURL(blob)

  const link = document.createElement('a')

  link.href = url
  link.download = `${fileName}.csv`

  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)

  window.URL.revokeObjectURL(url)
}