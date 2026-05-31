import { useParams, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import Breadcrumbs from '../../components/Breadcrumbs'
import SnapHeader from '../../components/SnapHeader'
import SnapHeaderCollapse from '../../components/SnapHeaderCollapse'
import EntityTabs from '../../components/EntityTabs'
import EntityDetailsForm from '../../components/EntityDetailsForm'

import {
  getEbookById,
  updateEbook,
  createEbook,
} from '../../api/students.api'

const EbookDetailsPage = () => {
  const { id, ebook_id } = useParams()
  const navigate = useNavigate()

  const isNew = ebook_id === 'new'

  const [ebook, setEbook] = useState(null)

  useEffect(() => {
    if (!isNew) {
      getEbookById(ebook_id).then(res =>
        setEbook(res.data.data)
      )
    } else {
      setEbook({ CourseID: id })
    }
  }, [ebook_id, id])

  const handleSave = async (data) => {
    if (isNew) {
      const res = await createEbook({
        ...data,
        CourseID: id,
      })

      const newId = res?.data?.ebook_id

      navigate(`/dashboard/courses/${id}/ebooks/${newId}`)
    } else {
      await updateEbook(ebook_id, data)
      getEbookById(ebook_id).then(res =>
        setEbook(res.data.data)
      )
    }
  }

  if (!ebook) return null

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Courses', to: '/dashboard/courses' },
          { label: `Course ${id}`, to: `/dashboard/courses/${id}` },
          {
            label: isNew ? 'New Ebook' : ebook.book_name,
            active: true,
          },
        ]}
      />

      {!isNew && (
        <SnapHeaderCollapse>
          <SnapHeader
            title="Ebook Summary"
            fields={[
              { label: 'Book Name', value: ebook.book_name },
              { label: 'Platform', value: ebook.video_platform },
              { label: 'Duration', value: ebook.duration_seconds },
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
                data={ebook}
                mode={isNew ? 'edit' : 'view'}
                onSave={handleSave}
                fields={[
                  { key: 'book_name', label: 'Book Name', col: 'col-md-6' },
                  { key: 'video_id', label: 'Video ID', col: 'col-md-6' },

                  {
                    key: 'video_platform',
                    label: 'Platform',
                    col: 'col-md-6',
                  },

                  {
                    key: 'duration_seconds',
                    label: 'Duration (sec)',
                    type: 'number',
                    col: 'col-md-6',
                  },

                  {
                    key: 'ebook_order',
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
        ]}
      />
    </>
  )
}

export default EbookDetailsPage