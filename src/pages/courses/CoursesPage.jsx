import React, { useEffect, useState } from 'react'
import { getCoursesWithNoOfRegistration } from '../../api/students.api'
import Breadcrumbs from '../../components/Breadcrumbs'
import DynamicFilter from '../../components/filters/DynamicFilter'
import DataTable from '../../components/DataTable'
import FilterCollapse from '../../components/FilterCollapse'
import TableToolbar from '../../components/TableToolbar'
import CourseDetailsPage from './CourseDetailsPage'
import { useNavigate } from 'react-router-dom'
import { getCourseTypes } from '../../api/dropdown.api'


const CoursesPage = () => {
    const navigate = useNavigate()
  const [filters, setFilters] = useState({})
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  const courseFilters = [

  {
    name: "CourseType",
    label: "Course Type",
    type: "select",
    api: getCourseTypes,
    labelKey: "CourseType",
    valueKey: "CourseType",
    col: "col-md-3",
  },

 /* {
    name: "course_id",
    label: "Course",
    type: "select",
    api: getCoursesByType,
    dependsOn: "CourseType",
    labelKey: "CourseTitle",
    valueKey: "CourseID",
    col: "col-md-3",
  },
*/
  {
    name: "CourseTitle",
    label: "Course Title",
    type: "text",
    placeholder: "Search by title",
    col: "col-md-3",
  },
]

const columns = [
    {key: 'CourseID',
     label: 'Course ID',
     clickable: true,
     onClick: (row) => navigate(`/dashboard/courses/${row.CourseID}`),
     },
  { key: 'CourseTitle', label: 'Course Title' },
  { key: 'CourseSubTitle', label: 'Subtitle' },
  { key: 'CourseType', label: 'Course Type' },
  { key: 'CourseDate', label: 'Course Date' },
  { key: 'CourseLocation', label: 'Course Location' },
    { key: 'Fees', label: 'Fees' },
     { key: 'NoOfRegistrations', label: 'No. of Students Enrolled' },
]
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
<DynamicFilter
config={courseFilters}
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
      onClick: () => navigate('/dashboard/courses/new'),
    },
    {
      label: 'Export',
      icon: '⬇️',
      className: 'btn btn-outline-success btn-sm',
      onClick: () => navigate('/courses/export'),
    },
  ]}
/>
 {loading && <div>Loading courses...</div>}


      <DataTable
      columns={columns}
      data={courses}
      loading={loading}
    />
  
    </div>
  )
}

export default CoursesPage