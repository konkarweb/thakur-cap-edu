import React, { useEffect, useState } from 'react'
import { getStudentAssignments } from '../../../api/students.api'
import DataTable from '../../../components/DataTable'
import { useNavigate } from 'react-router-dom'




const AssignmentEnrolledTab = ({ enrollment_id }) => {
    const navigate = useNavigate()

const columns = [
    
    {key: 'submission_id',
     label: 'Submission ID',
     clickable: true,
     onClick: (row) => navigate(`/dashboard/assignment-submissions/${row.submission_id}`),
     },
      { key: 'submission_status', label: 'Submission Status' },
  { key: 'chapter_title', label: 'Chapter Title' },
 
  { key: 'assignment_title', label: 'Assignment Title' },
  { key: 'assignment_description', label: 'Description' },

  { key: 'due_date', label: 'Due Date' },
  
]

   // console.log('AssignmentEnrolledTab enrollment_id:', enrollment_id)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchStudentAssignments = async () => {
    setLoading(true)
    try {
      const res = await getStudentAssignments(enrollment_id)

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

export default AssignmentEnrolledTab