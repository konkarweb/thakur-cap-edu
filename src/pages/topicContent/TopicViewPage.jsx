import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import Breadcrumbs from '../../components/Breadcrumbs'
import SnapHeader from '../../components/SnapHeader'
import SnapHeaderCollapse from '../../components/SnapHeaderCollapse'

import { getTopicById } from '../../api/students.api'

import DOMPurify from 'dompurify'

const TopicViewPage = () => {
  const { topic_id } = useParams()

  const [topic, setTopic] = useState(null)

  useEffect(() => {
    getTopicById(topic_id).then(res => {
      setTopic(res.data.topic)
    })
  }, [topic_id])

  if (!topic) return null

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/dashboard' },
          { label: topic.topic_title, active: true },
        ]}
      />

      <SnapHeaderCollapse>
        <SnapHeader
          title="Topic Details"
          fields={[
            { label: 'Title', value: topic.topic_title },

          ]}
        />
      </SnapHeaderCollapse>

      <div className="container mt-3">

        {/* 🔥 Topic Content (SAFE HTML RENDER) */}
        <div
          className="topic-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(topic.topic_content),
          }}
        />


      </div>
    </>
  )
}

export default TopicViewPage