import React from 'react'

const getStatusBadge = (status) => {
  switch (status) {
    case 'Submitted':
      return 'badge bg-success'
    case 'Evaluated':
      return 'badge bg-primary'
    default:
      return 'badge bg-warning text-dark'
  }
}

const AssignmentCard = ({ assignment }) => {
  return (
    <div className="card shadow-sm mb-3 border-0">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h6 className="fw-bold mb-1">
            {assignment.title}
          </h6>
          <small className="text-muted">
            Due: {assignment.dueDate}
          </small>
        </div>

        <span className={getStatusBadge(assignment.status)}>
          {assignment.status || 'New'}
        </span>
      </div>
    </div>
  )
}

export default AssignmentCard
