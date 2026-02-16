import React, { useState } from 'react'

const FilterCollapse = ({ children }) => {
  const [open, setOpen] = useState(true)

  return (
    <>
      {open && children}

      {/* Divider with center button */}
      <div className="position-relative my-3">
        <hr />

        <button
          className="btn btn-light border rounded-circle position-absolute top-50 start-50 translate-middle"
          style={{ width: 36, height: 36 }}
          onClick={() => setOpen(!open)}
          title={open ? 'Collapse Filters' : 'Expand Filters'}
        >
          {open ? '−' : '+'}
        </button>
      </div>
    </>
  )
}

export default FilterCollapse