import React from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../components/DataTable'

const CoursesTable = ({ data, loading }) => {
  const navigate = useNavigate()

const columns = [
    {key: 'CourseID',
     label: 'Course ID',
     clickable: true,
     onClick: (row) => navigate(`/dashboard/courses/${row.course_id}`),
     },
  { key: 'CourseTitle', label: 'Course Title' },
  { key: 'CourseSubTitle', label: 'Subtitle' },
  { key: 'CourseType', label: 'Course Type' },
  { key: 'CourseDate', label: 'Course Date' },
  { key: 'CourseLocation', label: 'Course Location' },
    { key: 'Fees', label: 'Fees' },
     { key: 'NoOfRegistrations', label: 'No. of Students Enrolled' },
]

  if (loading) return <div>Loading courses...</div>

  if (!data.length) return <div>No courses found</div>

  return (
      <DataTable
      columns={columns}
      data={data}
      loading={loading}
    />
  )
}

export default CoursesTable