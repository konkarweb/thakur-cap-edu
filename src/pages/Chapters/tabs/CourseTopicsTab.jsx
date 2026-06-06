import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TableToolbar from '../../../components/TableToolbar'
import DataTable from '../../../components/DataTable'

import { getTopicsByChapter } from '../../../api/students.api'
import ImportCsvModal  from '../../../components/ImportCsvModal'
import { exportToCsv } from '../../../utils/exportToCsv'
import { importCsv } from '../../../api/students.api'

const CourseTopicsTab = ({ chapter_id,  CourseID  }) => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
 // ✅ NEW: selection state
    const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    { key: 'topic_id', label: 'Topic ID',
       onClick: (row) =>
      navigate(`/dashboard/courses/${CourseID}/chapters/${chapter_id}/topics/${row.topic_id}`)
     },
     {key: 'chapter_id', label: 'Chapter ID'},
    { key: 'topic_title', label: 'Title' },
    { key: 'topic_order', label: 'Order' },
    {
      key: 'is_active',
      label: 'Active',
      render: (val) => (val == 1 ? 'Yes' : 'No'),
    }
  ]

  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true)
      try {
        const res = await getTopicsByChapter(chapter_id)
        const rows = res.data?.topics || []
        setData(rows)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (chapter_id) fetchTopics()
  }, [chapter_id])


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
            label: 'Add Topic',
            icon: '➕',
            className: 'btn btn-primary btn-sm',
            onClick: () => navigate(`/dashboard/courses/${CourseID}/chapters/${chapter_id}/topics/new`),
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
                      'Topics'
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
    setSelectedRows={setSelectedRows}/>
  
  <ImportCsvModal
        show={showImport}
        onClose={() =>
          setShowImport(false)
        }
        uploadApi={(file) =>
          importCsv(
            'topics',
            'topic_id',
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

export default CourseTopicsTab