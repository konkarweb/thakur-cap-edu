import React, { useState } from 'react'
import api from '../api/axios'

const ForgotPassword = () => {

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    try {

      const res = await api.post(
        '/user/forgot_password',
        { email }
      )

      setMessage(res.data.message)

    } catch {

      setMessage(
        'Unable to process request'
      )

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">

      <div
        className="card shadow p-4"
        style={{ width: '420px' }}
      >

        <h4 className="text-center mb-3">
          Forgot Password
        </h4>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e)=>
              setEmail(e.target.value)
            }
          />

          <button
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {
              loading
                ? 'Sending...'
                : 'Send Reset Link'
            }
          </button>

        </form>

        {message &&
          <div className="alert alert-success mt-3">
            {message}
          </div>
        }

      </div>

    </div>
  )
}

export default ForgotPassword