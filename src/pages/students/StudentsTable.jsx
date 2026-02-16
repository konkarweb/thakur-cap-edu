import React from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../components/DataTable'

const StudentsTable = ({ data, loading }) => {
  const navigate = useNavigate()

const columns = [
    {key: 'student_id',
     label: 'Student ID',
     clickable: true,
     onClick: (row) => navigate(`/dashboard/students/${row.student_id}`),
     },
  { key: 'student_name', label: 'Name' },
  { key: 'student_email', label: 'Email' },
  { key: 'Courses', label: 'Course Enrolled' }
]

  if (loading) return <div>Loading students...</div>

  if (!data.length) return <div>No students found</div>

  return (
      <DataTable
      columns={columns}
      data={data}
      loading={loading}
    />
  )
}

export default StudentsTable