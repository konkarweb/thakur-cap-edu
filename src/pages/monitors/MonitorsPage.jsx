import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getMonitors } from '../../api/students.api'
import Breadcrumbs from '../../components/Breadcrumbs'
import DataTable from '../../components/DataTable'
import DynamicFilter from '../../components/filters/DynamicFilter'
import FilterCollapse from '../../components/FilterCollapse'
import TableToolbar from '../../components/TableToolbar'
import { getIsActiveOptions } from '../../api/dropdown.api'

const monitorFilters = [
  {
    name: 'full_name',
    label: 'Monitor Name',
    type: 'text',
    placeholder: 'Search by name',
    col: 'col-md-3',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    placeholder: 'Search by email',
    col: 'col-md-3',
  },
  {
    name: 'is_active',
    label: 'Active',
    type: 'select',
    api: getIsActiveOptions,
    labelKey: 'label',
    valueKey: 'value',
    col: 'col-md-3',
  },
]

const MonitorsPage = () => {
  const navigate = useNavigate()
  const [monitors, setMonitors] = useState([])
  const [loading, setLoading] = useState(false)

  const columns = [
    {
      key: 'monitor_id',
      label: 'Monitor ID',
      clickable: true,
      onClick: (row) => navigate(`/dashboard/monitors/${row.monitor_id}`),
    },
    { key: 'monitor_name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'total_students', label: 'Total Students' },
    {
      key: 'is_active',
      label: 'Status',
      render: (value) => (value === 1 || value === '1' || value === true ? 'Active' : 'Inactive'),
    },
  ]

  const fetchMonitors = async (appliedFilters = {}) => {
    setLoading(true)
    try {
      const res = await getMonitors(appliedFilters)
      setMonitors(res.data?.data || [])
    } catch (err) {
      console.error('Failed to fetch monitors', err)
      setMonitors([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMonitors()
  }, [])

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Monitors', active: true },
        ]}
      />

      <FilterCollapse>
        <DynamicFilter config={monitorFilters} onSearch={fetchMonitors} />
      </FilterCollapse>

      <TableToolbar
        title="Monitors"
        count={monitors.length}
        actions={[
          {
            label: 'Add Monitor',
            icon: '+',
            className: 'btn btn-primary btn-sm',
            onClick: () => navigate('/dashboard/monitors/new'),
          },
        ]}
      />

      <DataTable columns={columns} data={monitors} loading={loading} />
    </div>
  )
}

export default MonitorsPage
