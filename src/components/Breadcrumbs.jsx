import React from 'react'
import { Link } from 'react-router-dom'

/**
 * items = [
 *   { label: 'Home', to: '/dashboard' },
 *   { label: 'Students', to: '/students' },
 *   { label: 'Edit', active: true }
 * ]
 */
const Breadcrumbs = ({ items = [] }) => {
  if (!items.length) return null

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb mb-2">

        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li
              key={index}
              className={`breadcrumb-item ${isLast || item.active ? 'active' : ''}`}
              aria-current={isLast ? 'page' : undefined}
            >
              {item.to && !isLast && !item.active ? (
                <Link to={item.to}>{item.label}</Link>
              ) : (
                item.label
              )}
            </li>
          )
        })}

      </ol>
    </nav>
  )
}

export default Breadcrumbs