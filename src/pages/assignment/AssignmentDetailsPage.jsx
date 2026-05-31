import { useParams, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import Breadcrumbs from '../../components/Breadcrumbs'
import SnapHeader from '../../components/SnapHeader'
import SnapHeaderCollapse from '../../components/SnapHeaderCollapse'
import EntityTabs from '../../components/EntityTabs'
import EntityDetailsForm from '../../components/EntityDetailsForm'
import ImageUploadField from '../../components/ImageUploadField'

import {
  getAssignmentById,
  updateAssignment,
  createAssignment,
} from '../../api/students.api'

const AssignmentDetailsPage = () => {
  const { id, chapter_id, assignment_id } = useParams()
  const navigate = useNavigate()

  const isNew = assignment_id === 'new'

  const [assignment, setAssignment] = useState(null)

  useEffect(() => {
    if (!isNew) {
      getAssignmentById(assignment_id).then(res =>
        setAssignment(res.data.assignment)
      )
    } else {
      setAssignment({ chapter_id })
    }
  }, [assignment_id, chapter_id])

  const handleSave = async (data) => {
    if (isNew) {
      const res = await createAssignment({
        ...data,
        chapter_id,
      })

      const newId = res?.data?.assignment_id

      navigate(
        `/dashboard/courses/${id}/chapters/${chapter_id}/assignments/${newId}`
      )
    } else {
      console.log('Updated assignment, refreshing details...:', data)
      await updateAssignment(assignment_id, data)
      
      getAssignmentById(assignment_id).then(res =>
        setAssignment(res.data.assignment)
      )
    }
  }

  if (!assignment) return null

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Courses', to: '/dashboard/courses' },
          { label: `Course ${id}`, to: `/dashboard/courses/${id}` },
          {
            label: `Chapter ${chapter_id}`,
            to: `/dashboard/courses/${id}/chapters/${chapter_id}`,
          },
          {
            label: isNew ? 'New Assignment' : assignment.title,
            active: true,
          },
        ]}
      />

      {!isNew && (
        <SnapHeaderCollapse>
          <SnapHeader
            title="Assignment Summary"
            fields={[
              { label: 'Title', value: assignment.title },
              { label: 'Due Date', value: assignment.due_date },
              {
                label: 'Active',
                value: assignment.is_active ? 'Yes' : 'No',
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
                data={assignment}
                mode={isNew ? 'edit' : 'edit'}
                onSave={handleSave}
                fields={[
                  { key: 'title', label: 'Title', col: 'col-md-6' },
                  {
                    key: 'description',
                    label: 'Description',
                    type: 'textarea',
                    col: 'col-md-12',
                  },
                  {
                    key: 'due_date',
                    label: 'Due Date',
                    type: 'date',
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

                  // 🔥 Images
                {
                key: 'image1',
                label: 'Image 1',
                col: 'col-md-6',
                render: (value, onChange) => (
                    <ImageUploadField value={value} onChange={onChange} />
                ),
                },
                {
                key: 'image2',
                label: 'Image 2',
                col: 'col-md-6',
                render: (value, onChange) => (
                    <ImageUploadField value={value} onChange={onChange} />
                ),
                },
                {
                key: 'image3',
                label: 'Image 3',
                col: 'col-md-6',
                render: (value, onChange) => (
                    <ImageUploadField value={value} onChange={onChange} />
                ),
                },
                {
                key: 'image4',
                label: 'Image 4',
                col: 'col-md-6',
                render: (value, onChange) => (
                    <ImageUploadField value={value} onChange={onChange} />
                ),
                },
                {
                key: 'image5',
                label: 'Image 5',
                col: 'col-md-6',
                render: (value, onChange) => (
                    <ImageUploadField value={value} onChange={onChange} />
                ),
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

export default AssignmentDetailsPage