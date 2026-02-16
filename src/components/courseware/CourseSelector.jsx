import React from 'react'

const CourseSelector = ({ courses, selectedCourse, onSelect }) => {
  return (
    <div className="mb-3 border-bottom pb-2">
      <div
        className="nav nav-pills flex-nowrap overflow-auto"
        style={{ scrollbarWidth: 'thin' }}
      >
        {courses.map(course => (
          <button
            key={course.id}
            onClick={() => onSelect(course)}
            className={`nav-link me-2 text-nowrap ${
              selectedCourse?.id === course.id
                ? 'active'
                : 'bg-light text-dark'
            }`}
            style={{
              borderRadius: '30px',
              minWidth: 'fit-content'
            }}
          >
            {course.title}
          </button>
        ))}
        
      </div>
    </div>
  )
}

export default CourseSelector
