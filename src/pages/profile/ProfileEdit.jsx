import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAuthUser, getBasicAuthHeader } from "../../utils/auth"

const ProfileEdit = () => {
  const navigate = useNavigate()
  const user = getAuthUser()

  const [form, setForm] = useState({
    full_name: user.full_name,
    email: user.email
  })

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()

    const res = await fetch(
      "https://thakurcapital.com/edu/api/user/update_profile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getBasicAuthHeader()
        },
        body: JSON.stringify({
          user_id: user.user_id,
          ...form
        })
      }
    )

    const data = await res.json()

    if (data.status) {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, ...form })
      )
      navigate("/profile")
    } else {
      alert(data.message || "Update failed")
    }
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-secondary text-white">
          Edit Profile
        </div>

        <form className="card-body" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              className="form-control"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  )
}

export default ProfileEdit