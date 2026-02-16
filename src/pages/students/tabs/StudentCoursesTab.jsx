import React, { useEffect, useState } from 'react'
import { getEnrolledCoursesByStudent } from '../../../api/students.api'
import DataTable from '../../../components/DataTable'
import { useNavigate } from 'react-router-dom'




const StudentCoursesTab = ({ studentId }) => {
    const navigate = useNavigate()

const columns = [
    
    {key: 'enrollment_id',
     label: 'Enrollment ID',
     clickable: true,
     onClick: (row) => navigate(`/dashboard/students/${row.student_id}/enrollment/${row.enrollment_id}`),
     },
    { key: 'CourseID', label: 'Course ID' },
  { key: 'CourseTitle', label: 'Course Name' },
  { key: 'CourseType', label: 'Type' },
  { key: 'CourseDate', label: 'Start Date' },
  { key: 'monitor_name', label: 'Monitor' },
  { key: 'monitor_email', label: 'Monitor Email' },
]

    console.log('StudentCoursesTab studentId:', studentId)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchCourses = async () => {
    setLoading(true)
    try {
      const res = await getEnrolledCoursesByStudent(studentId)

      // API returns object → normalize to array
      const rows = res.data?.data
        ? Array.isArray(res.data.data)
          ? res.data.data
          : [res.data.data]
        : []

      setData(rows)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (studentId) fetchCourses()
  }, [studentId])

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
    />
  )
}

export default StudentCoursesTab