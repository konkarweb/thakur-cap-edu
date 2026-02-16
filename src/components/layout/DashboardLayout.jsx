import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setMobileOpen(!mobileOpen)
    } else {
      setCollapsed(!collapsed)
    }
  }

  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50"
          style={{ zIndex: 998 }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar (FIXED) */}
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        closeMobile={() => setMobileOpen(false)}
      />

      {/* Right side */}
      <div className="flex-grow-1 d-flex flex-column min-width-0">

        {/* Topbar (STICKY / FIXED) */}
        <div style={{ flexShrink: 0 }}>
          <Topbar toggleSidebar={toggleSidebar} />
        </div>

        {/* ONLY THIS SCROLLS */}
        <div
          className="flex-grow-1 p-3 p-md-4"
          style={{
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default DashboardLayout