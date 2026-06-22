import React, {
  useState
} from 'react'

import {
  useSearchParams,
  useNavigate
} from 'react-router-dom'

import api from '../api/axios'

const ResetPassword = () => {

  const [searchParams] =
    useSearchParams()

  const navigate =
    useNavigate()

  const token =
    searchParams.get('token')

  const [password,
    setPassword] =
    useState('')

  const [message,
    setMessage] =
    useState('')

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      try {

        await api.post(
          '/user/reset_password',
          {
            token,
            new_password:
              password
          }
        )

        setMessage(
          'Password reset successful'
        )

        setTimeout(() => {

          navigate('/login')

        }, 2000)

      } catch {

        setMessage(
          'Invalid or expired token'
        )
      }
    }

  return (

    <div className="
      container
      vh-100
      d-flex
      justify-content-center
      align-items-center
    ">

      <div
        className="card shadow p-4"
        style={{ width:'420px' }}
      >

        <h4 className="text-center mb-3">
          Reset Password
        </h4>

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="password"
            className="form-control mb-3"
            placeholder="New Password"
            required
            value={password}
            onChange={(e)=>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            className="btn btn-success w-100"
          >
            Update Password
          </button>

        </form>

        {
          message &&
          <div
            className="alert alert-info mt-3"
          >
            {message}
          </div>
        }

      </div>

    </div>
  )
}

export default ResetPassword