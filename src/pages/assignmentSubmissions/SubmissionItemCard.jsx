import React from 'react'
import { formatToIST } from '../../utils/Intl.DateTimeFormat'

const SubmissionItemCard = ({ item, currentUserId }) => {
  const baseUrl = 'https://thakurcapital.com'
  const isMine = item.user_id === currentUserId
  

  return (
    <div
      className={`d-flex mb-3 ${
        isMine ? 'justify-content-end' : 'justify-content-start'
      }`}
    >
      <div
        className={`card shadow-sm ${
          isMine ? 'border-primary bg-light' : ''
        }`}
        style={{ maxWidth: '70%' }}
      >
        <div className="card-body py-2 px-3">

          {/* User Name */}
          
            <div
              className="mb-1"
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#0d6efd', // bootstrap primary
              }}
            >
              {item.user_full_name}
            </div>
          

          {/* Message */}
          <div
            className="submission-content"
            style={{ fontSize: '0.95rem' }}
            dangerouslySetInnerHTML={{ __html: item.descr }}
          />

          {/* Images */}
          <div className="mt-2 d-flex gap-2 flex-wrap">
            {[item.image1, item.image2, item.image3, item.image4, item.image5]
              .filter(Boolean)
              .map((img, idx) => (
                <img
                  key={idx}
                  src={baseUrl + img}
                  alt=""
                  className="rounded border img-fluid"
                  style={{ maxWidth: '160px' }}
                />
              ))}
          </div>

          {/* Footer: Timestamp */}
          <div className="d-flex justify-content-end mt-1">
            <small className="text-muted" style={{ fontSize: '0.7rem' }}>
              {formatToIST(item.uploaded_on)}
            </small>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SubmissionItemCard