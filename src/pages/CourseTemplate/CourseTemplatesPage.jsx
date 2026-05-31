import React, { useState, useEffect } from 'react'
import { getCoursesWithNoOfRegistration } from '../../api/students.api'
import Breadcrumbs from '../../components/Breadcrumbs'
import DynamicFilter from '../../components/filters/DynamicFilter'
import DataTable from '../../components/DataTable'
import FilterCollapse from '../../components/FilterCollapse'
import TableToolbar from '../../components/TableToolbar'
import { useNavigate } from 'react-router-dom'
import { getCourseTypes } from '../../api/dropdown.api'

// 👉 CREATE PROPER ACTION API (IMPORTANT)



const CourseTemplatesPage = () => {
  const navigate = useNavigate()

  const [filters, setFilters] = useState({
    CourseTemplate: 'X',
  })

useEffect(() => {
  fetchCourses({
    CourseTemplate: 'X',
  })
}, [])

  
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  // ✅ NEW: selection state
  const [selectedRows, setSelectedRows] = useState([])

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
    {
      name: "CourseTitle",
      label: "Course Title",
      type: "text",
      placeholder: "Search by title",
      col: "col-md-3",
    },
  ]

  // ✅ ROW LEVEL ACTIONS (GRID)
  const actions = [
  ]

  const columns = [
    {
      key: 'CourseID',
      label: 'Course ID',
      onClick: (row) => navigate(`/dashboard/courses/${row.CourseID}`),
    },
    { key: 'CourseTitle', label: 'Course Title' },
    { key: 'CourseSubTitle', label: 'Subtitle' },
    { key: 'CourseType', label: 'Course Type' }
  ]

  const fetchCourses = async (appliedFilters = {}) => {

    const finalFilters = {
    CourseTemplate: 'X',
    ...appliedFilters,
  }
    setLoading(true)
    try {
      setFilters(finalFilters)

      const res = await getCoursesWithNoOfRegistration(appliedFilters)
      setCourses(res.data.data || [])
      setSelectedRows([]) // reset selection
    } catch (err) {
      console.error('Failed to fetch courses', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Course Templates', active: true },
        ]}
      />

    

      {/* ✅ TOOLBAR WITH BULK ACTION */}
      <TableToolbar
        title="Course Templates"
        count={courses.length}
        selectedCount={selectedRows.length} // 🔥 NEW
        actions={[
          {
            label: 'Create Course Template',
            icon: '➕',
            className: 'btn btn-primary btn-sm',
            onClick: () => navigate('/dashboard/courses/newtemplate'),
        },
          // 🔥 BULK ACTION
          {
            label: 'Export',
            icon: '⬇️',
            className: 'btn btn-success btn-sm',
            disabled: selectedRows.length === 0,
            onClick: async () => {
              const ok = window.confirm(`Sync ${selectedRows.length} courses?`)
              if (!ok) return

              try {
                await getCourseTypes({
                  courseIds: selectedRows.map(r => r.CourseID),
                })

                fetchCourses(filters)
                setSelectedRows([])

              } catch (err) {
                console.error('Bulk sync failed', err)
              }
            },
          },
        ]}
      />

      {loading && <div>Loading courses...</div>}

      <DataTable
        columns={columns}
        data={courses}
        loading={loading}
        actions={actions}
        selectable={true} // 🔥 ENABLE
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
    </div>
  )
}

export default CourseTemplatesPage