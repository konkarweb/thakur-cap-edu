import { useParams, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import Breadcrumbs from '../../components/Breadcrumbs'
import SnapHeader from '../../components/SnapHeader'
import SnapHeaderCollapse from '../../components/SnapHeaderCollapse'
import EntityTabs from '../../components/EntityTabs'
import EntityDetailsForm from '../../components/EntityDetailsForm'
import {uploadTopicImage} from '../../api/students.api'

import {
  getTopicById,
  updateTopic,
  createTopic,
} from '../../api/students.api'


import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

import { useRef } from 'react'


const TopicDetailsPage = () => {
  
  const { id, chapter_id, topic_id } = useParams()
  const navigate = useNavigate()

  const isNew = topic_id === 'new'

  const [topic, setTopic] = useState(null)
  const [content, setContent] = useState('')

  const imageHandler = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.click()

  input.onchange = async () => {
    const file = input.files[0]

    if (!file) return

    try {
      const res = await uploadTopicImage(file)

      const imageUrl = res.data.url

      const quill = quillRef.current.getEditor()
      const range = quill.getSelection(true)

      quill.insertEmbed(range.index, 'image', imageUrl)

    } catch (err) {
      console.error('Image upload failed', err)
    }
  }
}

const quillRef = useRef()

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image'], // 👈 important
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
    handlers: {
      image: imageHandler,
    },
  },
}

  useEffect(() => {
    if (!isNew) {
      getTopicById(topic_id).then(res => {
      //  console.log('Fetched topic details:', res.data) // Debug log
        setTopic(res.data.topic)
        setContent(res.data.topic.topic_content || '')
      })
    } else {
      setTopic({ chapter_id })
    }
  }, [topic_id, chapter_id])

  const handleSave = async (data) => {
    const payload = {
      ...data,
      topic_content: content,
      chapter_id
    }

    if (isNew) {
      const res = await createTopic(payload)
      const newId = res?.data?.topic_id

      navigate(`/dashboard/courses/${id}/chapters/${chapter_id}/topics/${newId}`)
    } else {
      await updateTopic(topic_id, payload)
      getTopicById(topic_id).then(res => {
        setTopic(res.data.topic)
        setContent(res.data.topic.topic_content || '')
      })
    }
  }

  if (!topic) return null

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Courses', to: '/dashboard/courses' },
          { label: `Course ${id}`, to: `/dashboard/courses/${id}` },
          { label: `Chapter ${chapter_id}`, to: `/dashboard/courses/${id}/chapters/${chapter_id}` },
          {
            label: isNew ? 'New Topic' : topic.topic_title,
            active: true,
          },
        ]}
      />

      {!isNew && (
        <SnapHeaderCollapse>
          <SnapHeader
            title="Topic Summary"
            fields={[
              { label: 'Title', value: topic.topic_title },
              {
                label: 'Active',
                value: topic.is_active ? 'Yes' : 'No',
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
              <>
                <EntityDetailsForm
                  data={topic}
                  mode={isNew ? 'edit' : 'edit'}
                  onSave={handleSave}
                  fields={[
                    {
                      key: 'topic_title',
                      label: 'Title',
                      col: 'col-md-6',
                    },
                    {
                      key: 'topic_order',
                      label: 'Order',
                      type: 'number',
                      col: 'col-md-6',
                    },
                    {
                      key: 'pdf_url',
                      label: 'PDF URL',
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

                {/* 🔥 RICH TEXT EDITOR */}
                <div className="mt-4">
                  <label><b>Topic Content</b></label>
                 <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  style={{ height: '300px' }}
                />
                </div> 
              </>
              
            ),
          },
        ]}
      />
    </>
  )
}

export default TopicDetailsPage