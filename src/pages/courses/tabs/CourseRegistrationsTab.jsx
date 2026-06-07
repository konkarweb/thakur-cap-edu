import React, { useEffect, useState } from 'react'
import { getCoursesWithNoOfRegistration, sync_lms_student } from '../../../api/students.api'
import { useNavigate } from 'react-router-dom'
import TableToolbar from '../../../components/TableToolbar'
import { getRegistrationsByCourse } from '../../../api/students.api'
import DataTable from '../../../components/DataTable'
import ImportCsvModal  from '../../../components/ImportCsvModal'
import { exportToCsv } from '../../../utils/exportToCsv'
import { importCsv } from '../../../api/students.api'
import TableSettingsModal from '../../../components/TableSettingsModal'

const CourseRegistrationsTab = ({ CourseID }) => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  
  const actions = [
      {
        label: 'Create / Sync LMS Student',
        icon: '🎓',
        className: 'btn btn-success btn-sm',
        type: 'row',
        api: sync_lms_student, // ⚠️ FIXED (not GET API)
        confirm: true,
        getParams: (row) => ({
          RegID: row.RegID,
        }),
        onSuccess: () => getRegistrationsByCourse(CourseID),
      },
    ]

  const columns = [
    {
      key: 'RegID',
      label: 'Registration ID',
      clickable: true,
      onClick: (row) => navigate(`/dashboard/courses/${CourseID}/registrations/${row.RegID}`),
    },
     { key: 'CourceID', label: 'Course ID' },
    { key: 'Fname', label: 'First Name' },
    { key: 'Lname', label: 'Last Name' },
    { key: 'ContactNo', label: 'Contact Number' },
    { key: 'TransactionID', label: 'Transaction ID' },
    { key: 'OrderID', label: 'Order ID' },
    { key: 'EmailID', label: 'Email ID' },
    { key: 'State', label: 'State' },
    { key: 'City', label: 'City' },
    { key: 'Pincode', label: 'Pincode' },
    { key: 'Address', label: 'Address' },
    { key: 'PaymentMode', label: 'Payment Mode' },
    { key: 'PaymentStatus', label: 'Payment Status' },
    { key: 'Fees', label: 'Fees' },
    { key: 'RegisteredOn', label: 'Registered On' },
   
  ]

  useEffect(() => {
    const fetchCourseRegistrations = async () => {
      setLoading(true)
      try {
        const res = await getRegistrationsByCourse(CourseID)
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
      fetchCourseRegistrations()
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
        title="Registrations"
        count={data.length}
        selectedCount={selectedRows.length} // 🔥 NEW
        actions={[
          {
            label: '',
            icon: '➕',
            className: '',
            onClick: () => navigate(`/dashboard/courses/${CourseID}/registrations/new`),
          },
          {
                      label: 'Import',
                      icon: '⬆️',
                      className: '',
                      onClick: () =>
                        setShowImport(true),
                    },
                    // 🔥 BULK ACTION
                    {
                      label: 'Export',
                      icon: '⬇️',
                      className: '',
                      onClick: () =>
                        exportToCsv(
                          processedData,
                          columns,
                          'Registrations'
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

      <ImportCsvModal
        show={showImport}
        onClose={() =>
          setShowImport(false)
        }
        uploadApi={(file) =>
          importCsv(
            'Registrations',
            'RegID',
            file,
      
          )
        }
       
      />

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

export default CourseRegistrationsTab
