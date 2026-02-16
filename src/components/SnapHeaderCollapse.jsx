import React, { useState } from 'react'

const SnapHeaderCollapse = ({
  children,
  defaultOpen = true,
}) => {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <>
      {open && <div className="mb-4">{children}</div>}

      <div className="position-relative my-2">
        <hr className="m-0" />
        <button
          type="button"
          className="btn btn-light btn-sm rounded-circle position-absolute top-50 start-50 translate-middle"
          onClick={() => setOpen(!open)}
          title={open ? 'Collapse' : 'Expand'}
        >
          {open ? '▴' : '▾'}
        </button>
      </div>
    </>
  )
}

export default SnapHeaderCollapse