import React from "react"
import { Link } from "react-router-dom"
import { getAuthUser } from "../../utils/auth"

const ProfileView = () => {
  const user = getAuthUser()

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">My Profile</h5>
        </div>

        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-4 fw-bold">Full Name</div>
            <div className="col-md-8">{user.full_name}</div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4 fw-bold">Email</div>
            <div className="col-md-8">{user.email}</div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4 fw-bold">Role</div>
            <div className="col-md-8">
              <span className="badge bg-secondary">{user.role}</span>
            </div>
          </div>

          <div className="d-flex gap-2">
            <Link to="/dashboard/profile/edit" className="btn btn-outline-primary">
              Edit Profile
            </Link>

            <Link to="/dashboard/profile/change-password" className="btn btn-outline-danger">
              Change Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileView