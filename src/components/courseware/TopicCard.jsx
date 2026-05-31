import React from 'react'
import { useNavigate } from 'react-router-dom'

const TopicCard = ({ topic }) => {
  const navigate = useNavigate()

  return (
    <div className="card shadow-sm mb-3 border-0">
      <div className="card-body d-flex justify-content-between align-items-center">
        
        <div>
          <h6 className="fw-bold mb-1">{topic.title}</h6>

          {topic.pdfUrl && (
            <div>
              <a
                href={topic.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="small text-decoration-none"
              >
                📄 View PDF
              </a>
            </div>
          )}

          <button
            className="btn btn-sm btn-outline-primary mt-2"
            onClick={() =>
              navigate(`/dashboard/topics/${topic.id}`)
            }
          >
            View Topic
          </button>
        </div>

      </div>
    </div>
  )
}

  export default TopicCard