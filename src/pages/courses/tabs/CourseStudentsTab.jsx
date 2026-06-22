import React, { useEffect, useState } from 'react'
import { getCoursesWithNoOfRegistration, sync_lms_student } from '../../../api/students.api'
import { useNavigate } from 'react-router-dom'
import TableToolbar from '../../../components/TableToolbar'
import { getStudentsByCourse } from '../../../api/students.api'
import DataTable from '../../../components/DataTable'
import ImportCsvModal  from '../../../components/ImportCsvModal'
import { exportToCsv } from '../../../utils/exportToCsv'
import { importCsv } from '../../../api/students.api'
import TableSettingsModal from '../../../components/TableSettingsModal'

const CourseStudentsTab = ({ CourseID }) => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  
  const actions = [
     
    ]

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

  useEffect(() => {
    const fetchCourseStudents = async () => {
      setLoading(true)
      try {
        const res = await getStudentsByCourse(CourseID)
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

    if (CourseID) {
      fetchCourseStudents()
    }
  }, [CourseID])

  const [showImport, setShowImport] =
    useState(false)

    const [showSettings, setShowSettings] =
  useState(false)

const [filters, setFilters] =
  useState({})

const [sortConfig, setSortConfig] =
  useState({
    key: '',
    direction: 'asc'
  })

  const processedData = [...data]

  .filter(row => {

    return Object.entries(filters)
      .every(([key, value]) => {

        if (!value) return true

        return String(
          row[key] ?? ''
        )
          .toLowerCase()
          .includes(
            value.toLowerCase()
          )
      })
  })

  .sort((a, b) => {

    if (!sortConfig.key)
      return 0

    const valA =
      a[sortConfig.key]

    const valB =
      b[sortConfig.key]

    if (valA < valB)
      return sortConfig.direction === 'asc'
        ? -1
        : 1

    if (valA > valB)
      return sortConfig.direction === 'asc'
        ? 1
        : -1

    return 0
  })

  return (
    <>
     <TableToolbar
        title="Students"
        count={data.length}
        selectedCount={selectedRows.length} // 🔥 NEW
        actions={[
         
         
                    // 🔥 BULK ACTION
                    {
                      label: 'Export',
                      icon: '⬇️',
                      className: '',
                      onClick: () =>
                        exportToCsv(
                          processedData,
                          columns,
                          'Students'
                        ),
                    },
                    {
  label: '',
  icon: '⚙️',
  className: '',
  onClick: () =>
    setShowSettings(true),
}
        ]}
      />
    <DataTable 
      columns={columns} 
      data={processedData}
      actions={actions}
      selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        selectable={true} // 🔥 ENABLE
      loading={loading} />

      

      <TableSettingsModal
  show={showSettings}
  onClose={() =>
    setShowSettings(false)
  }
  columns={columns}
  filters={filters}
  setFilters={setFilters}
  sortConfig={sortConfig}
  setSortConfig={setSortConfig}
/>

    </>
  )
}

export default CourseStudentsTab
