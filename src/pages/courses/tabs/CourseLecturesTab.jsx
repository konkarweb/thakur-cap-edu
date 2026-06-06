import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TableToolbar from '../../../components/TableToolbar'
import DataTable from '../../../components/DataTable'

import { getLecturesByCourse } from '../../../api/students.api'
import ImportCsvModal  from '../../../components/ImportCsvModal'
import { exportToCsv } from '../../../utils/exportToCsv'
import { importCsv } from '../../../api/students.api'

const CourseLecturesTab = ({ CourseID }) => {

  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    {
      key: 'lecture_id',
      label: 'Lecture ID',
      onClick: (row) =>
        navigate(`/dashboard/courses/${CourseID}/lectures/${row.lecture_id}`),
    },
    {key: 'CourseID', label: 'Course ID'},

    {
      key: 'lecture_title',
      label: 'Lecture Title',
    },

    {
      key: 'lecture_date',
      label: 'Date',
    },

    {
      key: 'lecture_time',
      label: 'Time',
    },

    {
      key: 'video_platform',
      label: 'Platform',
    },

    {
      key: 'tag',
      label: 'Tag',
    },
  ]

  useEffect(() => {

    const fetchLectures = async () => {

      setLoading(true)

      try {

        const res = await getLecturesByCourse(CourseID)

        const rows = res.data?.data
          ? Array.isArray(res.data.data)
            ? res.data.data
            : [res.data.data]
          : []

        setData(rows)

      } catch (err) {

        console.error('Failed to fetch lectures', err)

      } finally {

        setLoading(false)

      }

    }

    if (CourseID) {
      fetchLectures()
    }

  }, [CourseID])

   const [showImport, setShowImport] =
      useState(false)

  return (
    <>
      <TableToolbar
        title="Lectures"
        count={data.length}
        selectedCount={selectedRows.length}
        actions={[
          {
            label: 'Add Lecture',
            icon: '➕',
            className: 'btn btn-primary btn-sm',
            onClick: () =>
              navigate(`/dashboard/courses/${CourseID}/lectures/new`),
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
            data,
            columns,
            'Lectures'
             ),
          },
        ]}
      />

      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        selectable={true}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />

      <ImportCsvModal
        show={showImport}
        onClose={() =>
          setShowImport(false)
        }
        uploadApi={(file) =>
          importCsv(
            'lectures',
            'lecture_id',
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

export default CourseLecturesTab