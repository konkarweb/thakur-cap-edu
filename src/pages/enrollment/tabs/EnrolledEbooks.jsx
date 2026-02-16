import React, { useEffect, useState } from 'react'
import { getStudentEbooksPrgs } from '../../../api/students.api'
import DataTable from '../../../components/DataTable'
import { useNavigate } from 'react-router-dom'




const EbookEnrolledTab = ({ enrollment_id }) => {
    const navigate = useNavigate()

const columns = [
    
    {key: 'progress_id',
     label: 'Progress ID',
    },
      { key: 'book_name', label: 'Book Name' },
  { key: 'is_completed', label: 'Completed' },
 
  { key: 'watched_percent', label: 'Watched %' },
  { key: 'duration_seconds', label: 'Duration (seconds)' },
  
]

   // console.log('AssignmentEnrolledTab enrollment_id:', enrollment_id)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchStudentAssignments = async () => {
    setLoading(true)
    try {
      const res = await getStudentEbooksPrgs(enrollment_id)

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

export default EbookEnrolledTab