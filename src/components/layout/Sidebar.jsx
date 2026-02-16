import React from 'react'
import { useNavigate } from "react-router-dom"


const Sidebar = ({ collapsed, mobileOpen, closeMobile }) => {
  const isMobile = window.innerWidth < 768
  const sidebarWidth = collapsed ? 60 : 220
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("auth"))
  const role = user?.role
const menuItems = [
  {
    label: "Dashboard",
    icon: "📊",
    path: "/dashboard",
    roles: ["ADMIN", "MONITOR", "STUDENT"]
  },
  {
    label: "Courseware",
    icon: "📚",
    path: "/dashboard/courseswares",
    roles: ["STUDENT"]
  },
  {
    label: "Courses",
    icon: "📚",
    path: "/dashboard/courses",
    roles: ["ADMIN", "MONITOR"]
  },
  {
    label: "Users",
    icon: "👥",
    path: "/dashboard/users",
    roles: ["ADMIN", "MONITOR"]
  },
  {
    label: "Students",
    icon: "👥",
    path: "/dashboard/students",
    roles: ["ADMIN", "MONITOR"]
  }
]


  return (
    
    <div
      className={`bg-dark text-white d-flex flex-column`}
      style={{
        width: sidebarWidth,
        height: '100vh',
        transition: 'all 0.3s ease',
        position: isMobile ? 'fixed' : 'static',
        zIndex: isMobile ? 999 : 'auto',
        transform:
          isMobile && !mobileOpen
            ? 'translateX(-100%)'
            : 'translateX(0)',
      }}
    >
      {/* Brand */}
      <div className="py-3 text-center fw-bold border-bottom">
        {collapsed ? 'TC' : 'Thakur Edu'}
      </div>

      {/* Menu */}
      <ul className="nav flex-column mt-3">
  {menuItems
    .filter(item => item.roles.includes(role))
    .map((item, index) => (
      <li
        key={index}
        className="nav-item px-3 py-2 d-flex align-items-center gap-2"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          navigate(item.path)
          if (isMobile) closeMobile()
        }}
      >
        <span>{item.icon}</span>
        {!collapsed && <span>{item.label}</span>}
      </li>
    ))}
</ul>

    </div>
  )
}

export default Sidebar