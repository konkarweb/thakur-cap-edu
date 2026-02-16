import { useParams } from 'react-router-dom'
import React,  { useEffect, useState } from 'react'
import SnapHeader from '../../components/SnapHeader'
import EntityTabs from '../../components/EntityTabs'
import EntityDetailsForm from '../../components/EntityDetailsForm'
import Breadcrumbs from '../../components/Breadcrumbs'
import SnapHeaderCollapse from '../../components/SnapHeaderCollapse'
import StudentCoursesTab from '../../pages/students/tabs/StudentCoursesTab'
import { getStudentById, updateStudent } from '../../api/students.api'

const StudentDetailsPage = () => {
  const { id } = useParams()
  const [student, setStudent] = useState(null)

  useEffect(() => {
    getStudentById(id).then(res => setStudent(res.data.data))
  }, [id])

  if (!student) return null

  return (
    <>
    <Breadcrumbs
  items={[
    { label: 'Home', to: '/dashboard' },
    { label: 'Students', to: '/dashboard/students' },
    { label: student.full_name, active: true },
  ]}
/>
      <SnapHeaderCollapse>
      <SnapHeader
        title="Student Summary"
        fields={[
          { label: 'Name', value: student.full_name },
          { label: 'Email', value: student.email },
          { label: 'Status', value: student.is_active ? 'Active' : 'Inactive' },
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
                  { key: 'email', label: 'Email' },
                ]}
                onSave={data => updateStudent(id, data)}
              />
            ),
          },
          {
            key: 'courses',
            label: 'Courses',
            render: () => <StudentCoursesTab studentId={student.user_id} />,
          },
         
        ]}
      />
    </>
  )
}

export default StudentDetailsPage