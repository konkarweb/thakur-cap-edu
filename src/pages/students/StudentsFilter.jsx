import React, { useState } from 'react'

const StudentsFilter = ({ onSearch }) => {
  const [course, setCourse] = useState('')
  const [active, setActive] = useState('')
  const [name, setName] = useState('')

  const handleGo = () => {
    onSearch({
      course_id: course,
      is_active: active,
      student_name: name,
    })
  }


  return (
    <div className="card p-3 mb-3">
      <div className="row g-2 align-items-end">

        <div className="col-md-3">
          <label>Course</label>
          <select className="form-select" onChange={e => setCourse(e.target.value)}>
            <option value="">All</option>
            <option value="1">Thakur Capital Wealth Builder</option>
          </select>
        </div>

        <div className="col-md-2">
          <label>Active</label>
          <select className="form-select" onChange={e => setActive(e.target.value)}>
           <option value="">All</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>

        <div className="col-md-3">
          <label>Student Name</label>
          <input
            className="form-control"
            placeholder="Search by name"
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleGo}>
            Go
          </button>
        </div>

      </div>
    </div>
  )
}

export default StudentsFilter