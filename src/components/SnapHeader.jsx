import React, { useState } from 'react'

const SnapHeader = ({ title, fields = [] }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="snap-header sticky-top">
      {/* Card */}
      <div className="snap-header-card bg-white">

        {/* Title */}
        <div className="snap-header-title px-4 pt-3 pb-2">
          <h6 className="mb-0 fw-semibold">{/*title*/}</h6>
        </div>

        {/* Fields */}
        {!collapsed && (
          <div className="snap-header-fields px-4 pb-3">
            <div className="row g-3">
              {fields.map((f) => (
                <div className="col-md-3 col-sm-6" key={f.label}>
                  <div className="snap-field">
                    <small className="text-muted d-block">
                      {f.label}
                    </small>
                    <div className="fw-semibold text-truncate">
                      {f.value ?? '-'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

    

      </div>
    </div>
  )
}

export default SnapHeader