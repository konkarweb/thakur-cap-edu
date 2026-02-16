import { useParams } from 'react-router-dom'
import React,  { useEffect, useState } from 'react'
import SnapHeader from '../../components/SnapHeader'
import EntityTabs from '../../components/EntityTabs'
import EntityDetailsForm from '../../components/EntityDetailsForm'
import Breadcrumbs from '../../components/Breadcrumbs'
import SnapHeaderCollapse from '../../components/SnapHeaderCollapse'
import AssignmentEnrolledTab from '../enrollment/tabs/EnrolledAssignments'
import EbookEnrolledTab from './tabs/EnrolledEbooks'
import AttendanceEnrolledTab from './tabs/EnrolledAttendance'
import { getStudentById, getEnrollmentDetails } from '../../api/students.api'

const EnrollmentDetailsPage = () => {
  const { id } = useParams()
  const {enrl_id} = useParams()
  const [student, setStudent] = useState(null)
  const [enrollment, setEnrollment] = useState(null)

 // console.log('EnrollmentDetailsPage id:', enrollment)

  useEffect(() => {
    getStudentById(id).then(res => setStudent(res.data.data))
  }, [id])

  useEffect(() => {
    getEnrollmentDetails(enrl_id).then(res => setEnrollment(res.data.data))
  }, [id])

  if (!student || !enrollment) return null

  return (
    <>
    <Breadcrumbs
  items={[
    { label: 'Home', to: '/dashboard' },
    { label: 'Students', to: '/dashboard/students' },
    { label:  student.full_name, to: `/dashboard/students/${id}` },
    { label:  enrollment.CourseTitle, active: true },
  ]}
/>
      <SnapHeaderCollapse>
      <SnapHeader
        title="Student Summary"
        fields={[
          { label: 'Course Name', value: enrollment.CourseTitle },
          { label: 'Course Type', value: enrollment.CourseType },
          { label: 'Course Date', value: enrollment.CourseDate },
          { label: 'Monitor Name', value: enrollment.monitor_name },
          { label: 'Monitor Email ', value: enrollment.monitor_email }
        ]}
      />
        </SnapHeaderCollapse>

      <EntityTabs
        tabs={[
          {
            key: 'details',
            label: 'Details',
            render: () => (
              <EntityDetailsForm
                data={student}
                fields={[
                  { key: 'full_name', label: 'Full Name' },
                  { key: 'email', label: 'Email' }
                ]}
                onSave={data => updateStudent(id, data)}
              />
            ),
          },
          {
            key: 'Assignments',
            label: 'Assignments',
            render: () => <AssignmentEnrolledTab  enrollment_id={enrollment.enrollment_id} />,
          },
          {
            key: 'Ebooks',
            label: 'Ebooks',
            render: () => <EbookEnrolledTab enrollment_id={enrollment.enrollment_id} />,
          },
          {
            key: 'Attendance',
            label: 'Attendance',
            render: () => <AttendanceEnrolledTab enrollment_id={enrollment.enrollment_id} />,
          },
         
        ]}
      />
    </>
  )
}

export default EnrollmentDetailsPage