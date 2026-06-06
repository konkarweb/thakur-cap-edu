import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TableToolbar from '../../../components/TableToolbar'
import DataTable from '../../../components/DataTable'
import { getEbooksByCourse } from '../../../api/students.api'
import ImportCsvModal  from '../../../components/ImportCsvModal'
import { exportToCsv } from '../../../utils/exportToCsv'
import { importCsv } from '../../../api/students.api'

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
    {key: 'CourseID', label: 'Course ID'},
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

   const [showImport, setShowImport] =
      useState(false)

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
          {
                                label: 'Import',
                                icon: '⬆️',
                                className: 'btn btn-warning btn-sm',
                                onClick: () =>
                                setShowImport(true),
                              },
                            // 🔥 BULK ACTION
                              {
                                label: 'Export',
                                icon: '⬇️',
                                className: 'btn btn-success btn-sm',
                                onClick: () =>
                                exportToCsv(
                                data,
                                columns,
                                'Ebooks'
                                 ),
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

      <ImportCsvModal
        show={showImport}
        onClose={() =>
          setShowImport(false)
        }
        uploadApi={(file) =>
          importCsv(
            'course_ebooks',
            'ebook_id',
            file,
      
          )
        }
        onSuccess={() =>
          fetchCourses(filters)
        }
      />
    </>
  )
}

export default CourseEbooksTab