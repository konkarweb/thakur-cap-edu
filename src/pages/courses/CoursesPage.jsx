import React, { useEffect, useState } from 'react'
import { getCoursesWithNoOfRegistration } from '../../api/students.api'
import Breadcrumbs from '../../components/Breadcrumbs'
import CoursesFilter from './CoursesFilter'
import CoursesTable from './CoursesTable'
import FilterCollapse from '../../components/FilterCollapse'
import TableToolbar from '../../components/TableToolbar'

const CoursesPage = () => {
  const [filters, setFilters] = useState({})
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchCourses = async (appliedFilters = {}) => {
  setLoading(true)
  try {
    const res = await getCoursesWithNoOfRegistration(appliedFilters)
    setCourses(res.data.data || [])
  } catch (err) {
    console.error('Failed to fetch courses', err)
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="">
      <Breadcrumbs
items={[
{ label: 'Home', to: '/dashboard' },
{ label: 'Courses', active: true },
]}
/>
      
<FilterCollapse>
<CoursesFilter
onApply={setFilters}
onSearch={fetchCourses}
/>
</FilterCollapse>

    <TableToolbar
  title="Courses"
  count={courses.length}
  actions={[
    {
      label: 'Add Course',
      icon: '➕',
      className: 'btn btn-primary btn-sm',
      onClick: () => navigate('/courses/add'),
    },
    {
      label: 'Export',
      icon: '⬇️',
      className: 'btn btn-outline-success btn-sm',
      onClick: () => navigate('/courses/export'),
    },
  ]}
/>
      <CoursesTable data={courses} loading={loading} />
    </div>
  )
}

export default CoursesPage