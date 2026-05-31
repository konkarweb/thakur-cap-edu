import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TableToolbar from '../../../components/TableToolbar'
import DataTable from '../../../components/DataTable'
import { getEbooksByCourse } from '../../../api/students.api'

const CourseEbooksTab = ({ CourseID }) => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    {
      key: 'ebook_id',
      label: 'Ebook ID',
      onClick: (row) =>
        navigate(`/dashboard/courses/${CourseID}/ebooks/${row.ebook_id}`),
    },
    { key: 'book_name', label: 'Book Name' },
    { key: 'video_platform', label: 'Platform' },
    { key: 'duration_seconds', label: 'Duration (sec)' },
    { key: 'ebook_order', label: 'Order' },
    {
      key: 'is_active',
      label: 'Active',
      render: (val) => (val == 1 ? 'Yes' : 'No'),
    },
  ]

  useEffect(() => {
    const fetchEbooks = async () => {
      setLoading(true)
      try {
        const res = await getEbooksByCourse(CourseID)

        const rows = res.data?.data
          ? Array.isArray(res.data.data)
            ? res.data.data
            : [res.data.data]
          : []

        setData(rows)
      } catch (err) {
        console.error('Failed to fetch ebooks', err)
      } finally {
        setLoading(false)
      }
    }

    if (CourseID) fetchEbooks()
  }, [CourseID])

  return (
    <>
      <TableToolbar
        title="Ebooks"
        count={data.length}
        selectedCount={selectedRows.length}
        actions={[
          {
            label: 'Add Ebook',
            icon: '➕',
            className: 'btn btn-primary btn-sm',
            onClick: () =>
              navigate(`/dashboard/courses/${CourseID}/ebooks/new`),
          },
        ]}
      />

      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        selectable={true}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
    </>
  )
}

export default CourseEbooksTab