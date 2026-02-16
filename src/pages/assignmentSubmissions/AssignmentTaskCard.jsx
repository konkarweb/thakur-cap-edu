import React from 'react'


const AssignmentTaskCard = ({ assignment }) => {
if (!assignment) return null


const images = [
assignment.image1,
assignment.image2,
assignment.image3,
assignment.image4,
assignment.image5,
assignment.image6,
assignment.image7,
].filter(Boolean)


return (
<div className="card mb-4 shadow-sm border-0">
<div className="card-body">


{/* Header */}
<div className="d-flex justify-content-between align-items-start mb-2">
<h5 className="fw-semibold mb-0">
{assignment.title}
</h5>


{assignment.due_date && (
<span className="badge bg-warning-subtle text-dark">
Due: {assignment.due_date}
</span>
)}
</div>


{/* Description */}
<div
className="mt-3"
style={{ lineHeight: 1.6 }}
dangerouslySetInnerHTML={{ __html: assignment.description }}
/>


{/* Images */}
{images.length > 0 && (
<>
<hr />
<div className="row g-3">
{images.map((img, idx) => (
<div className="col-md-3 col-sm-4 col-6" key={idx}>
<a href={img} target="_blank" rel="noreferrer">
<img
src={img}
alt={`assignment-${idx}`}
className="img-fluid rounded border"
/>
</a>
</div>
))}
</div>
</>
)}


</div>
</div>
)
}


export default AssignmentTaskCard