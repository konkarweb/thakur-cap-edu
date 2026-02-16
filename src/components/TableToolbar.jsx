import React from 'react'

const TableToolbar = ({ title, count, actions = [] }) => {
return (
<div
className="table-toolbar-sticky d-flex justify-content-between align-items-center px-3 py-2 mb-0"
style={{
background: '#f8f9fa',
border: '1px solid #dee2e6',
borderBottom: 'none',
borderRadius: '6px 6px 0 0',
}}
>
{/* Left: Title */}
<div>
<h6 className="mb-0 fw-semibold">
{title}
<span className="text-muted ms-2">({count})</span>
</h6>
</div>


{/* Right: Actions */}
<div className="d-flex gap-2">
{actions.map((action, index) => (
<button
key={index}
className={action.className || 'btn btn-outline-secondary btn-sm'}
onClick={action.onClick}
disabled={action.disabled}
title={action.tooltip}
>
{action.icon && <span className="me-1">{action.icon}</span>}
{action.label}
</button>
))}
</div>
</div>
)
}

export default TableToolbar