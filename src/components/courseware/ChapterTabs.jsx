import React from 'react'

const ChapterTabs = ({ chapters, selectedChapter, onSelect }) => {
  return (
    <div className="mb-4">
      <div className="d-flex flex-nowrap overflow-auto gap-2 pb-2">

        {chapters.map(ch => (
          <button
            key={ch.id}
            onClick={() => onSelect(ch)}
            className={`btn btn-sm ${
              selectedChapter?.id === ch.id
                ? 'btn-dark'
                : 'btn-outline-secondary'
            }`}
            style={{
              borderRadius: '30px',
              whiteSpace: 'nowrap'
            }}
          >
            {ch.title}
          </button>
        ))}

      </div>
    </div>
  )
}

export default ChapterTabs
