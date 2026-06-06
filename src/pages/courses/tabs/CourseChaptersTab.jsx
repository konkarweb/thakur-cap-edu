import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TableToolbar from '../../../components/TableToolbar'
import DataTable from '../../../components/DataTable'
import { getChaptersByCourse } from '../../../api/students.api'

import ImportCsvModal  from '../../../components/ImportCsvModal'
import { exportToCsv } from '../../../utils/exportToCsv'
import { importCsv } from '../../../api/students.api'

const CourseChaptersTab = ({ CourseID }) => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
   // ✅ NEW: selection state
    const [selectedRows, setSelectedRows] = useState([])

  const columns = [
   {
    key: 'chapter_id',
    label: 'Chapter ID',
    onClick: (row) =>
      navigate(`/dashboard/courses/${CourseID}/chapters/${row.chapter_id}`),
    },
    {key: 'CourseID', label: 'Course ID'},
    { key: 'chapter_title', label: 'Title' },
    { key: 'chapter_sub_title', label: 'Subtitle' },
    { key: 'chapter_order', label: 'Order' },
    {
      key: 'is_active',
      label: 'Active',
      render: (val) => (val == 1 ? 'Yes' : 'No'),
    },
  ]

  useEffect(() => {
    const fetchChapters = async () => {
      setLoading(true)
      try {
        const res = await getChaptersByCourse(CourseID)

        const rows = res.data?.data
          ? Array.isArray(res.data.data)
            ? res.data.data
            : [res.data.data]
          : []

        setData(rows)
      } catch (err) {
        console.error('Failed to fetch chapters', err)
      } finally {
        setLoading(false)
      }
    }

    if (CourseID) {
      fetchChapters()
    }
  }, [CourseID])

 const [showImport, setShowImport] =
    useState(false)

  return (
    <>
     <TableToolbar
        title="Chapters"
        count={data.length}
        selectedCount={selectedRows.length} // 🔥 NEW
        actions={[
          {
            label: 'Add Chapter',
            icon: '➕',
            className: 'btn btn-primary btn-sm',
            onClick: () => navigate(`/dashboard/courses/${CourseID}/chapters/new`),
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
                      'Chapters'
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
            'chapters',
            'chapter_id',
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

export default CourseChaptersTab