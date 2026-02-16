import React, { useState } from 'react'

const EntityTabs = ({ tabs }) => {
  const [active, setActive] = useState(tabs[0]?.key)

  return (
    <>
      <ul className="nav nav-tabs mt-3">
        {tabs.map(tab => (
          <li className="nav-item" key={tab.key}>
            <button
              className={`nav-link ${active === tab.key ? 'active' : ''}`}
              onClick={() => setActive(tab.key)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content border border-top-0 p-3 bg-white">
        {tabs.map(
          tab =>
            tab.key === active && (
              <div key={tab.key}>{tab.render()}</div>
            )
        )}
      </div>
    </>
  )
}

export default EntityTabs