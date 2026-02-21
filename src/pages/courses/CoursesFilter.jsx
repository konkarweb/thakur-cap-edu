import React, { useState } from 'react'

const CoursesFilter = ({ onSearch }) => {
  const [CourseType, setCourseType] = useState('')
  const [CourseTitle, setCourseTitle] = useState('')
  
  const handleGo = () => {
    onSearch({
      CourseType: CourseType,
      CourseTitle: CourseTitle,
      student_name: name,
    })
  }


  return (
    <div className="card p-3 mb-3">
      <div className="row g-2 align-items-end">

        <div className="col-md-3">
          <label>CourseType</label>
          <select className="form-select" onChange={e => setCourseType(e.target.value)}>
            <option value="">All</option>
            <option value="Level 0">Level 0</option>
            <option value="Level 1">Level 1</option>
            <option value="Level 2">Level 2</option>
            <option value="Level 3">Level 3</option>
            <option value="Level 4">Level 4</option>
          </select>
        </div>

    

        <div className="col-md-3">
          <label>Course Title</label>
          <input
            className="form-control"
            placeholder="Search by Course Title"
            onChange={e => setCourseTitle(e.target.value)}
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

export default CoursesFilter