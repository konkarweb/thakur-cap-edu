import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TableToolbar from '../../../components/TableToolbar'
import DataTable from '../../../components/DataTable'
import { getAssignmentsByChapter } from '../../../api/students.api'

const CourseAssignmentsTab = ({ chapter_id, CourseID }) => {
  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    {
      key: 'assignment_id',
      label: 'Assignment ID',
      onClick: (row) =>
        navigate(
          `/dashboard/courses/${CourseID}/chapters/${chapter_id}/assignments/${row.assignment_id}`
        ),
    },
    { key: 'title', label: 'Title' },
    { key: 'due_date', label: 'Due Date' },
    {
      key: 'is_active',
      label: 'Active',
      render: (val) => (val == 1 ? 'Yes' : 'No'),
    },
  ]

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true)
      try {
        const res = await getAssignmentsByChapter(chapter_id)

        const rows = res.data?.assignments || []
        setData(rows)
      } catch (err) {
        console.error('Failed to fetch assignments', err)
      } finally {
        setLoading(false)
      }
    }

    if (chapter_id) fetchAssignments()
  }, [chapter_id])

  return (
    <>
      <TableToolbar
        title="Assignments"
        count={data.length}
        selectedCount={selectedRows.length}
        actions={[
          {
            label: 'Add Assignment',
            icon: '➕',
            className: 'btn btn-primary btn-sm',
            onClick: () =>
              navigate(
                `/dashboard/courses/${CourseID}/chapters/${chapter_id}/assignments/new`
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
    </>
  )
}

export default CourseAssignmentsTab