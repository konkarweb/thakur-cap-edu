import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { createMonitor, getMonitorById, updateMonitor } from '../../api/students.api'
import Breadcrumbs from '../../components/Breadcrumbs'
import EntityDetailsForm from '../../components/EntityDetailsForm'
import SnapHeader from '../../components/SnapHeader'
import SnapHeaderCollapse from '../../components/SnapHeaderCollapse'

const emptyMonitor = {
  full_name: '',
  email: '',
  phone: '',
  is_active: '1',
  role: 'MONITOR',
}

const monitorFields = [
  { key: 'full_name', label: 'Full Name', col: 'col-md-6' },
  { key: 'email', label: 'Email', col: 'col-md-6' },
  { key: 'phone', label: 'Phone', col: 'col-md-6' },
  {
    key: 'is_active',
    label: 'Is Active',
    type: 'select',
    col: 'col-md-6',
    options: [
      { label: 'Yes', value: '1' },
      { label: 'No', value: '0' },
    ],
  },
]

const MonitorDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = id === 'new'

  const [monitor, setMonitor] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isNew) {
      setMonitor(emptyMonitor)
      setLoading(false)
      return
    }

    setLoading(true)
    getMonitorById(id).then((res) => {
      setMonitor(res.data?.data ?? null)
    }).catch((err) => {
      console.error('Failed to fetch monitor', err)
      setMonitor(null)
    }).finally(() => {
      setLoading(false)
    })
  }, [id, isNew])

  const handleSave = async (data) => {
    if (isNew) {
      const res = await createMonitor(data)
      const newId =
        res?.data?.monitor_id ||
        res?.data?.MonitorID ||
        res?.data?.data?.monitor_id ||
        res?.data?.data?.MonitorID

      if (newId) {
        navigate(`/dashboard/monitors/${newId}`)
      }

      return
    }

    await updateMonitor(id, data)
    const res = await getMonitorById(id)
    setMonitor(res.data?.data ?? data)
  }

  if (loading) return <div>Loading...</div>
  if (!monitor) return <div className="text-muted">Monitor details not found.</div>

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Monitors', to: '/dashboard/monitors' },
          { label: isNew ? 'New Monitor' : monitor.full_name || `Monitor ${id}`, active: true },
        ]}
      />

      {!isNew && (
        <SnapHeaderCollapse>
          <SnapHeader
            title="Monitor Summary"
            fields={[
              { label: 'Name', value: monitor.full_name },
              { label: 'Email', value: monitor.email },
              {
                label: 'Status',
                value: monitor.is_active === 1 || monitor.is_active === '1' || monitor.is_active === true
                  ? 'Active'
                  : 'Inactive',
              },
            ]}
          />
        </SnapHeaderCollapse>
      )}

      <EntityDetailsForm
        data={monitor}
        fields={monitorFields}
        mode={isNew ? 'edit' : 'view'}
        onSave={handleSave}
      />
    </>
  )
}

export default MonitorDetailsPage
