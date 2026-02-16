import React, { useEffect, useState } from 'react'
import { getStudents } from '../../api/students.api'
import Breadcrumbs from '../../components/Breadcrumbs'
import StudentsFilter from './StudentsFilter'
import StudentsTable from './StudentsTable'
import FilterCollapse from '../../components/FilterCollapse'
import TableToolbar from '../../components/TableToolbar'

const StudentsPage = () => {
  const [filters, setFilters] = useState({})
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchStudents = async (appliedFilters = {}) => {
  setLoading(true)
  try {
    const res = await getStudents(appliedFilters)
    setStudents(res.data.data || [])
  } catch (err) {
    console.error('Failed to fetch students', err)
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="">
      <Breadcrumbs
items={[
{ label: 'Home', to: '/dashboard' },
{ label: 'Students', active: true },
]}
/>
      
<FilterCollapse>
<StudentsFilter
onApply={setFilters}
onSearch={fetchStudents}
/>
</FilterCollapse>

    <TableToolbar
  title="Students"
  count={students.length}
  actions={[
    {
      label: 'Add Student',
      icon: '➕',
      className: 'btn btn-primary btn-sm',
      onClick: () => navigate('/students/add'),
    },
    {
      label: 'Export',
      icon: '⬇️',
      className: 'btn btn-outline-success btn-sm',
      onClick: () => navigate('/students/add'),
    },
  ]}
/>
      <StudentsTable data={students} loading={loading} />
    </div>
  )
}

export default StudentsPage