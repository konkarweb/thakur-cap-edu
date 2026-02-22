import React, { useEffect, useState } from 'react'
import { getStudents } from '../../api/students.api'
import Breadcrumbs from '../../components/Breadcrumbs'
import DynamicFilter from '../../components/filters/DynamicFilter'
import FilterCollapse from '../../components/FilterCollapse'
import TableToolbar from '../../components/TableToolbar'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../components/DataTable'
import { getCourseTypes,
   getCoursesByType,
  getIsActiveOptions } from '../../api/dropdown.api'

const StudentsPage = () => {
   const navigate = useNavigate()

  const [filters, setFilters] = useState({})
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)

  const studentFilters = [
  
    {
      name: "CourseType",
      label: "Course Type",
      type: "select",
      api: getCourseTypes,
      labelKey: "CourseType",
      valueKey: "CourseType",
      col: "col-md-3",
    },
  
    {
      name: "CourseTitle",
      label: "Course Title",
      type: "select",
      api: getCoursesByType,
      dependsOn: "CourseType",
      labelKey: "CourseTitle",
      valueKey: "CourseTitle",
      col: "col-md-3",
    },
  
     {
      name: "student_name",
      label: "Student Name",
      type: "text",
      placeholder: "Search by name",
      col: "col-md-3",
    },
    {
      name: "is_active",
      label: "Active",
      type: "select",
      api: getIsActiveOptions,
      labelKey: "label",
      valueKey: "value",
      col: "col-md-3",
    }
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
<DynamicFilter
config={studentFilters}
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
    
  { loading && <div>Loading students...</div>}
 

      <DataTable
      columns={columns}
      data={students}
      loading={loading}
    />

     
    </div>
  )
}

export default StudentsPage