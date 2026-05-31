import React, { useEffect, useState } from 'react'
import { getCoursesWithNoOfRegistration, sync_lms_student } from '../../../api/students.api'
import { useNavigate } from 'react-router-dom'
import TableToolbar from '../../../components/TableToolbar'
import { getRegistrationsByCourse } from '../../../api/students.api'
import DataTable from '../../../components/DataTable'

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

  return (
    <>
     <TableToolbar
        title="Registrations"
        count={data.length}
        selectedCount={selectedRows.length} // 🔥 NEW
        actions={[
          {
            label: 'Add Registration',
            icon: '➕',
            className: 'btn btn-primary btn-sm',
            onClick: () => navigate(`/dashboard/courses/${CourseID}/registrations/new`),
          },
        ]}
      />
    <DataTable 
      columns={columns} 
      data={data} 
      actions={actions}
      selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        selectable={true} // 🔥 ENABLE
      loading={loading} />
    </>
  )
}

export default CourseRegistrationsTab
