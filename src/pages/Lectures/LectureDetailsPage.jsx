import { useParams, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import Breadcrumbs from '../../components/Breadcrumbs'
import SnapHeader from '../../components/SnapHeader'
import SnapHeaderCollapse from '../../components/SnapHeaderCollapse'
import EntityTabs from '../../components/EntityTabs'
import EntityDetailsForm from '../../components/EntityDetailsForm'

import {
  getLectureById,
  updateLecture,
  createLecture,
} from '../../api/students.api'

const LectureDetailsPage = () => {

  const { id, lecture_id } = useParams()

  const navigate = useNavigate()

  const isNew = lecture_id === 'new'

  const [lecture, setLecture] = useState(null)

  useEffect(() => {

    if (!isNew) {

      getLectureById(lecture_id).then(res =>
        setLecture(res.data.data)
      )

    } else {

      setLecture({
        CourseID: id,
      })

    }

  }, [lecture_id, id])

  const handleSave = async (data) => {

    if (isNew) {

      const res = await createLecture({
        ...data,
        CourseID: id,
      })

      const newId = res?.data?.lecture_id

      navigate(`/dashboard/courses/${id}/lectures/${newId}`)

    } else {

      await updateLecture(lecture_id, data)

      getLectureById(lecture_id).then(res =>
        setLecture(res.data.data)
      )

    }

  }

  if (!lecture) return null

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Courses', to: '/dashboard/courses' },
          { label: `Course ${id}`, to: `/dashboard/courses/${id}` },
          {
            label: isNew
              ? 'New Lecture'
              : lecture.lecture_title,
            active: true,
          },
        ]}
      />

      {!isNew && (
        <SnapHeaderCollapse>
          <SnapHeader
            title="Lecture Summary"
            fields={[
              { label: 'Lecture Title', value: lecture.lecture_title },
              { label: 'Date', value: lecture.lecture_date },
              { label: 'Platform', value: lecture.video_platform },
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
                data={lecture}
                mode={isNew ? 'edit' : 'view'}
                onSave={handleSave}
                fields={[

                  {
                    key: 'lecture_title',
                    label: 'Lecture Title',
                    col: 'col-md-6',
                  },

                  {
                    key: 'lecture_date',
                    label: 'Lecture Date',
                    type: 'date',
                    col: 'col-md-6',
                  },

                  {
                    key: 'lecture_time',
                    label: 'Lecture Time',
                    type: 'time',
                    col: 'col-md-6',
                  },

                  {
                    key: 'video_id',
                    label: 'Video ID',
                    col: 'col-md-6',
                  },

                  {
                    key: 'video_platform',
                    label: 'Platform',
                    col: 'col-md-6',
                  },

                  {
                    key: 'tag',
                    label: 'Tag',
                    type: 'textarea',
                    rows: 3,
                    col: 'col-md-12',
                  },

                ]}
              />
            ),
          },
        ]}
      />
    </>
  )
}

export default LectureDetailsPage