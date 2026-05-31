import { useParams, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import Breadcrumbs from '../../components/Breadcrumbs'
import SnapHeader from '../../components/SnapHeader'
import SnapHeaderCollapse from '../../components/SnapHeaderCollapse'
import EntityTabs from '../../components/EntityTabs'
import EntityDetailsForm from '../../components/EntityDetailsForm'

import {
  getRegistrationById,
  updateRegistration,
  createRegistration,
} from '../../api/students.api'

const RegistrationDetailsPage = () => {
  const { id, reg_id } = useParams()
  const navigate = useNavigate()

  const isNew = reg_id === 'new'

  const [registration, setRegistration] = useState(null)

  useEffect(() => {
    if (!isNew) {
      getRegistrationById(reg_id).then(res =>
        setRegistration(res.data.data)
      )
    } else {
      setRegistration({ CourceID: id })
    }
  }, [reg_id, id])

  const handleSave = async (data) => {
    if (isNew) {
      const res = await createRegistration({
        ...data,
        CourceID: id,
      })

      const newId = res?.data?.RegID

      navigate(`/dashboard/courses/${id}/registrations/${newId}`)
    } else {
      await updateRegistration(reg_id, data)
      getRegistrationById(reg_id).then(res =>
        setRegistration(res.data.data)
      )
    }
  }

  if (!registration) return null

  return (
    <>
      {/* ================= Breadcrumb ================= */}
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Courses', to: '/dashboard/courses' },
          { label: `Course ${id}`, to: `/dashboard/courses/${id}` },
          {
            label: isNew
              ? 'New Registration'
              : `${registration.Fname} ${registration.Lname}`,
            active: true,
          },
        ]}
      />

      {/* ================= Header ================= */}
      {!isNew && (
        <SnapHeaderCollapse>
          <SnapHeader
            title="Registration Summary"
            fields={[
              { label: 'Name', value: `${registration.Fname} ${registration.Lname}` },
              { label: 'Contact', value: registration.ContactNo },
              { label: 'Payment Status', value: registration.PaymentStatus },
              { label: 'Mode', value: registration.PaymentMode },
            ]}
          />
        </SnapHeaderCollapse>
      )}

      {/* ================= Tabs ================= */}
      <EntityTabs
        tabs={[
          {
            key: 'details',
            label: 'Details',
            render: () => (
              <EntityDetailsForm
                data={registration}
                mode={isNew ? 'edit' : 'view'}
                onSave={handleSave}
                fields={[
                  { key: 'Fname', label: 'First Name', col: 'col-md-4' },
                  { key: 'Mname', label: 'Middle Name', col: 'col-md-4' },
                  { key: 'Lname', label: 'Last Name', col: 'col-md-4' },

                  { key: 'ContactNo', label: 'Contact Number', col: 'col-md-6' },
                  { key: 'AlternateNo', label: 'Alternate Number', col: 'col-md-6' },

                  { key: 'EmailID', label: 'Email', col: 'col-md-6' },

                  { key: 'State', label: 'State', col: 'col-md-4' },
                  { key: 'City', label: 'City', col: 'col-md-4' },
                  { key: 'Pincode', label: 'Pincode', col: 'col-md-4' },

                  { key: 'Address', label: 'Address', col: 'col-md-12', type: 'textarea' },

                  {
                    key: 'PaymentMode',
                    label: 'Payment Mode',
                    col: 'col-md-6',
                  },
                  {
                    key: 'PaymentStatus',
                    label: 'Payment Status',
                    col: 'col-md-6',
                  },

                  { key: 'Fees', label: 'Fees', col: 'col-md-6', type: 'number' },

                  { key: 'TransactionID', label: 'Transaction ID', col: 'col-md-6' },
                  { key: 'OrderID', label: 'Order ID', col: 'col-md-6' },

                  { key: 'RegisteredOn', label: 'Registered On', col: 'col-md-6', type: 'text' },

                  { key: 'CourceID', label: 'Course ID', col: 'col-md-6' },
                ]}
              />
            ),
          },

          
        ]}
      />
    </>
  )
}

export default RegistrationDetailsPage