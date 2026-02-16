import React, { useEffect, useState } from 'react'
import { getStudentAttendance } from '../../../api/students.api'
import DataTable from '../../../components/DataTable'
import { useNavigate } from 'react-router-dom'




const AttendanceEnrolledTab = ({ enrollment_id }) => {
    const navigate = useNavigate()

const columns = [
    
    {key: 'attendance_id',
     label: 'Attendance ID',
       clickable: true,
     onClick: (row) => navigate(`/dashboard/attendance/${row.attendance_id}`),
     
    },
      { key: 'lecture_title', label: 'Lecture Title' },
  { key: 'lecture_date', label: 'Lecture Date' },
 
  { key: 'lecture_time', label: 'Lecture Time' },
  { key: 'attendance_status', label: 'Attendance Status' },
  
]

   // console.log('AssignmentEnrolledTab enrollment_id:', enrollment_id)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchStudentAssignments = async () => {
    setLoading(true)
    try {
      const res = await getStudentAttendance(enrollment_id)

     //  API returns object → normalize to array
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
    if (enrollment_id) fetchStudentAssignments()
  }, [enrollment_id])

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
    />
  )
}

export default AttendanceEnrolledTab