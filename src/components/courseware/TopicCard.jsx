import React from 'react'

const TopicCard = ({ topic }) => {
  return (
    <div className="card shadow-sm mb-3 border-0">
      <div className="card-body">
        <h6 className="fw-bold mb-1">{topic.title}</h6>

        {topic.pdfUrl && (
          <a
            href={topic.pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="small text-decoration-none"
          >
            📄 View PDF
          </a>
        )}
      </div>
    </div>
  )
}

export default TopicCard
