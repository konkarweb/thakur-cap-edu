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
import TableSettingsModal from '../../components/TableSettingsModal'

// 👉 CREATE PROPER ACTION API (IMPORTANT)


const CoursesPage = () => {
  const navigate = useNavigate()

  // API Search Filters (DynamicFilter)
const [searchFilters, setSearchFilters] = useState({})

// UI Table Filters (Settings Popup)
const [tableFilters, setTableFilters] = useState({})

const [sortConfig, setSortConfig] =
  useState({
    key: '',
    direction: 'asc'
  })

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
      onSuccess: () => fetchCourses(searchFilters),
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
    // Save API search filters
    setSearchFilters(appliedFilters)

    const res =
      await getCoursesWithNoOfRegistration(
        appliedFilters
      )

    setCourses(res.data.data || [])
    setSelectedRows([])
  } catch (err) {
    console.error(
      'Failed to fetch courses',
      err
    )
  } finally {
    setLoading(false)
  }
}

  const [showImport, setShowImport] =
  useState(false)

 const [showSettings, setShowSettings] =
  useState(false)



  const processedData = [...courses]

  .filter((row) => {

    return Object.entries(
      tableFilters
    ).every(([key, value]) => {

      if (!value) return true

      return String(
        row[key] ?? ''
      )
        .toLowerCase()
        .includes(
          String(value)
            .toLowerCase()
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

    if (valA == null) return -1
    if (valB == null) return 1

    if (valA < valB)
      return sortConfig.direction ===
        'asc'
        ? -1
        : 1

    if (valA > valB)
      return sortConfig.direction ===
        'asc'
        ? 1
        : -1

    return 0
  })


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
            label: '',
            icon: '➕',
            className: 'btn btn-light border-0',
            onClick: () => navigate('/dashboard/courses/new'),
          },
          {
            label: 'Upload',
            icon: '📤',
            className: 'btn btn-light border-0',
            onClick: () =>
              setShowImport(true),
          },
          // 🔥 BULK ACTION
          {
            label: 'Download',
            icon: '📥',
            className: 'btn btn-light border-0',
            onClick: () =>
              exportToCsv(
                processedData,
                columns,
                'Courses'
              ),
          },
          {
  label: '',
  icon: '⚙️',
  className: 'btn btn-light border-0',
  onClick: () =>
    setShowSettings(true),
}
        ]}
      />

      {loading && <div>Loading courses...</div>}

      <DataTable
        columns={columns}
        data={processedData}
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

<TableSettingsModal
  show={showSettings}
  onClose={() =>
    setShowSettings(false)
  }
  columns={columns}
  filters={tableFilters}
  setFilters={setTableFilters}
  sortConfig={sortConfig}
  setSortConfig={setSortConfig}
/>
</>
  )
  
}

export default CoursesPage