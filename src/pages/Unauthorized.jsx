import React from "react"
import { Link } from "react-router-dom"

const Unauthorized = () => {
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="text-danger">403</h1>
        <h4>Unauthorized Access</h4>
        <p>You do not have permission to view this page.</p>

        <Link to="/dashboard" className="btn btn-primary">
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default Unauthorized