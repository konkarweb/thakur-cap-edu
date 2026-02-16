import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getBasicAuthHeader } from "../../utils/auth"

const ChangePassword = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    current_password: "",
    new_password: ""
  })

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()

    const res = await fetch(
      "https://thakurcapital.com/edu/api/user/change_password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getBasicAuthHeader()
        },
        body: JSON.stringify(form)
      }
    )

    const data = await res.json()

    if (data.status) {
      alert("Password changed successfully")
      navigate("/profile")
    } else {
      alert(data.message || "Password change failed")
    }
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-danger">
        <div className="card-header bg-danger text-white">
          Change Password
        </div>

        <form className="card-body" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              className="form-control"
              name="current_password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              name="new_password"
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-danger">Update Password</button>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword