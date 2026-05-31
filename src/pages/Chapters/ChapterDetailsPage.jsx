import { useParams, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import Breadcrumbs from '../../components/Breadcrumbs'
import SnapHeader from '../../components/SnapHeader'
import SnapHeaderCollapse from '../../components/SnapHeaderCollapse'
import EntityTabs from '../../components/EntityTabs'
import EntityDetailsForm from '../../components/EntityDetailsForm'
import CourseAssignmentsTab from './tabs/CourseAssignmentsTab'

import {
  getChapterById,
  updateChapter,
  createChapter,
} from '../../api/students.api'

import CourseTopicsTab from './tabs/CourseTopicsTab'

const ChapterDetailsPage = () => {
  const { id, chapter_id } = useParams()
  const navigate = useNavigate()

  const isNew = chapter_id === 'new'

  const [chapter, setChapter] = useState(null)

  useEffect(() => {
    if (!isNew) {
      getChapterById(chapter_id).then(res =>
        setChapter(res.data.data)
      )
    } else {
      setChapter({ CourseID: id })
    }
  }, [chapter_id, id])

  const handleSave = async (data) => {
    if (isNew) {
      const res = await createChapter({
        ...data,
        CourseID: id,
      })

      const newId = res?.data?.chapter_id

      navigate(`/dashboard/courses/${id}/chapters/${newId}`)
    } else {
      await updateChapter(chapter_id, data)
      getChapterById(chapter_id).then(res =>
        setChapter(res.data.data)
      )
    }
  }

  if (!chapter) return null

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Courses', to: '/dashboard/courses' },
          { label: `Course ${id}`, to: `/dashboard/courses/${id}` },
          {
            label: isNew
              ? 'New Chapter'
              : chapter.chapter_title,
            active: true,
          },
        ]}
      />

      {!isNew && (
        <SnapHeaderCollapse>
          <SnapHeader
            title="Chapter Summary"
            fields={[
              { label: 'Title', value: chapter.chapter_title },
              { label: 'Order', value: chapter.chapter_order },
              {
                label: 'Active',
                value: chapter.is_active ? 'Yes' : 'No',
              },
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
                data={chapter}
                mode={isNew ? 'edit' : 'view'}
                onSave={handleSave}
                fields={[
                  {
                    key: 'chapter_title',
                    label: 'Title',
                    col: 'col-md-6',
                  },
                  {
                    key: 'chapter_sub_title',
                    label: 'Subtitle',
                    col: 'col-md-6',
                  },
                  {
                    key: 'chapter_order',
                    label: 'Order',
                    type: 'number',
                    col: 'col-md-6',
                  },
                  {
                    key: 'is_active',
                    label: 'Active',
                    type: 'select',
                    col: 'col-md-6',
                    options: [
                      { label: 'Yes', value: 1 },
                      { label: 'No', value: 0 },
                    ],
                  },
                ]}
              />
            ),
          },
          {
            key: 'topics',
            label: 'Topics',
            render: () => (
              <CourseTopicsTab 
              chapter_id={chapter_id}
              CourseID={id}  />
            ),
          },
          {
            key: 'assignments',
            label: 'Assignments',
            render: () => (
                <CourseAssignmentsTab
                chapter_id={chapter_id}
                CourseID={id}
                />
            ),
          }
        ]}
      />
    </>
  )
}

export default ChapterDetailsPage