import React, { useState } from 'react'
import { getCoursesWithNoOfRegistration, syncCourse } from '../../api/students.api'
import Breadcrumbs from '../../components/Breadcrumbs'
import DynamicFilter from '../../components/filters/DynamicFilter'
import DataTable from '../../components/DataTable'
import FilterCollapse from '../../components/FilterCollapse'
import TableToolbar from '../../components/TableToolbar'
import { useNavigate } from 'react-router-dom'
import { getCourseTypes } from '../../api/dropdown.api'
import ImportCsvModal  from '../../components/ImportCsvModal'
import { exportToCsv } from '../../utils/exportToCsv'
import { importCsv } from '../../api/students.api'

// 👉 CREATE PROPER ACTION API (IMPORTANT)


const CoursesPage = () => {
  const navigate = useNavigate()

  const [filters, setFilters] = useState({})
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
    {
      label: 'Generate / Sync LMS Course',
      icon: '🎓',
      className: 'btn btn-success btn-sm',
      type: 'row',
      api: syncCourse, // ⚠️ FIXED (not GET API)
      confirm: true,
      getParams: (row) => ({
        courseId: row.CourseID,
      }),
      onSuccess: () => fetchCourses(filters),
    },
  ]

  const columns = [
    {
      key: 'CourseID',
      label: 'Course ID',
      onClick: (row) => navigate(`/dashboard/courses/${row.CourseID}`),
    },
    { key: 'CourseTitle', label: 'Course Title' },
    { key: 'CourseSubTitle', label: 'Subtitle' },
    { key: 'CourseType', label: 'Course Type' },
    { key: 'CourseDate', label: 'Course Date' },
    { key: 'CourseLocation', label: 'Course Location' },
    { key: 'Fees', label: 'Fees' },
  ]

  const fetchCourses = async (appliedFilters = {}) => {
    setLoading(true)
    try {
      setFilters(appliedFilters)
      const res = await getCoursesWithNoOfRegistration(appliedFilters)
      setCourses(res.data.data || [])
      setSelectedRows([]) // reset selection
    } catch (err) {
      console.error('Failed to fetch courses', err)
    } finally {
      setLoading(false)
    }
  }

  const [showImport, setShowImport] =
  useState(false)

  return (
    <>
    <div>
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

      {/* ✅ TOOLBAR WITH BULK ACTION */}
      <TableToolbar
        title="Courses"
        count={courses.length}
        selectedCount={selectedRows.length} // 🔥 NEW
        actions={[
          {
            label: 'Add Course',
            icon: '➕',
            className: 'btn btn-primary btn-sm',
            onClick: () => navigate('/dashboard/courses/new'),
          },
          {
            label: 'Import',
            icon: '⬆️',
            className: 'btn btn-warning btn-sm',
            onClick: () =>
              setShowImport(true),
          },
          // 🔥 BULK ACTION
          {
            label: 'Export',
            icon: '⬇️',
            className: 'btn btn-success btn-sm',
            onClick: () =>
              exportToCsv(
                courses,
                columns,
                'Courses'
              ),
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
    

    <ImportCsvModal
  show={showImport}
  onClose={() =>
    setShowImport(false)
  }
  uploadApi={(file) =>
    importCsv(
      'Courses',
      'CourseID',
      file,

    )
  }
  onSuccess={() =>
    fetchCourses(filters)
  }
/>
</>
  )
  
}

export default CoursesPage