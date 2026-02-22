import { useParams, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import SnapHeader from '../../components/SnapHeader'
import EntityTabs from '../../components/EntityTabs'
import EntityDetailsForm from '../../components/EntityDetailsForm'
import Breadcrumbs from '../../components/Breadcrumbs'
import SnapHeaderCollapse from '../../components/SnapHeaderCollapse'

import { getCourseById, updateCourse, createCourse} from '../../api/students.api'
import { getCourseTypes } from '../../api/dropdown.api'

const CourseDetailsPage = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const isNew = id === "new"

  const [course, setCourse] = useState(null)
  const [courseTypes, setCourseTypes] = useState([])

  useEffect(() => {

    if (!isNew) {
      getCourseById(id).then(res => setCourse(res.data.data))
    } else {
      setCourse({})
    }

    getCourseTypes().then(res => {

      const formatted = res.map(item => ({
        label: item.CourseType + " - " + item.CourseTypeDesc,
        value: item.CourseType
      }))

      setCourseTypes(formatted)

    })

  }, [id])

  const handleSave = async (data) => {

    if (isNew) {

      const res = await createCourse(data)

      const newId =
        res?.data?.CourseID ||
        res?.data?.data?.CourseID

      navigate(`/dashboard/courses/${newId}`)

    } else {

      await updateCourse(id, data)

      getCourseById(id).then(res => setCourse(res.data.data))

    }

  }

  if (!course) return null

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Courses', to: '/dashboard/courses' },
          { label: isNew ? "New Course" : course.CourseTitle, active: true },
        ]}
      />

      {!isNew && (
        <SnapHeaderCollapse>
          <SnapHeader
            title="Course Summary"
            fields={[
              { label: 'Name', value: course.CourseTitle },
              { label: 'Course Type', value: course.CourseType },
              { label: 'Status', value: course.CourseDate },
            ]}
          />
        </SnapHeaderCollapse>
      )}

      <EntityTabs
        tabs={[
          {
            key: 'details',
            label: 'Details',
            render: () => (
              <EntityDetailsForm
                data={course}
                mode={isNew ? "edit" : "view"}
                onSave={handleSave}
                fields={[
                  { key: 'CourseTitle', label: 'Course Title', col: 'col-md-6' },
                  { key: 'CourseSubTitle', label: 'Course Subtitle', col: 'col-md-6' },

                  {
                    key: 'CourseType',
                    label: 'Course Type',
                    col: 'col-md-6',
                    options: courseTypes,
                    type: 'select'
                  },

                  {
                    key: 'CourseDesc',
                    label: 'Course Description',
                    col: 'col-md-12',
                    type: 'textarea',
                    rows: 5
                  },

                  { key: 'CourseDate', label: 'Course Date', type: 'date', col: 'col-md-6' },

                  { key: 'CourseLocation', label: 'Course Location', col: 'col-md-6' },

                  { key: 'CourseBy', label: 'Course By', col: 'col-md-6' },

                  { key: 'Language', label: 'Language', col: 'col-md-6' },

                  { key: 'Fees', label: 'Fees', type: 'number', col: 'col-md-6' },

                  { key: 'Time', label: 'Time', col: 'col-md-6' },

                  {
                    key: 'Completed',
                    label: 'Stop Registrations',
                    col: 'col-md-6',
                    type: 'select',
                    options: [
                      { label: 'Yes', value: 'X' },
                      { label: 'No', value: '' }
                    ]
                  },

                  { key: 'ZoomLink', label: 'Zoom Link', col: 'col-md-12' },

                  {
                    key: 'CourseStatus',
                    label: 'Is Active',
                    col: 'col-md-6',
                    type: 'select',
                    options: [
                      { label: 'Yes', value: '1' },
                      { label: 'No', value: '0' },
                      { label: '', value: '' }
                    ]
                  }
                ]}
              />
            ),
          }
        ]}
      />
    </>
  )
}

export default CourseDetailsPage