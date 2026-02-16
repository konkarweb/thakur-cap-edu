import React from 'react'
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../auth/AuthContext'


const Topbar = ({ toggleSidebar }) => {
  const { logout } = useAuth()
const navigate = useNavigate()


const handleLogout = async () => {

logout()
navigate("/login", { replace: true })
}

  return (
    <nav className="navbar navbar-light bg-light px-3 shadow-sm">
     <button
  className="btn btn-outline-secondary"
  onClick={toggleSidebar}
>
  ☰
</button>

      <div className="d-flex align-items-center gap-3">
        🔔

        <div className="dropdown">
          <span
            className="dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
          >
            👤
          </span>

          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button className="dropdown-item" onClick={() => navigate("/dashboard/profile")}>View Profile</button>
            </li>
            <li>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Topbar