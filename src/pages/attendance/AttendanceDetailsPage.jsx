import { useParams } from 'react-router-dom'
import React,  { useEffect, useState } from 'react'
import SnapHeader from '../../components/SnapHeader'
import EntityTabs from '../../components/EntityTabs'
import EntityDetailsForm from '../../components/EntityDetailsForm'
import Breadcrumbs from '../../components/Breadcrumbs'
import SnapHeaderCollapse from '../../components/SnapHeaderCollapse'
import { getStudentById, getStudentAttendanceByID, updateAttendance} from '../../api/students.api'

const AttendanceDetailsPage = () => {

  const { id } = useParams()
  const {enrl_id} = useParams()
  const [student, setStudent] = useState(null)
  const [StudentAttendance, setStudentAttendance] = useState(null)

useEffect(() => {
     getStudentAttendanceByID(id).then(res => setStudentAttendance(res.data.data))
  }, [id])

    
    useEffect(() => {
       if (!StudentAttendance?.student_id) return
    
        getStudentById(StudentAttendance.student_id).then(res => setStudent(res.data.data))
        }, [StudentAttendance?.student_id])

    if (!StudentAttendance) return null
    

 // console.log('EnrollmentDetailsPage id:', enrollment)


  return (
    <>
    <Breadcrumbs
  items={[
    { label: 'Home', to: '/dashboard' },
     ...(student
? [
{ label: 'Students', to: '/dashboard/students' },
{
label: student.full_name,
to: `/dashboard/students/${student.full_name}`,
},

]
: []),
    
    { label:  StudentAttendance.CourseTitle, to: `/dashboard/students/${StudentAttendance.student_id}/enrollment/${StudentAttendance.enrollment_id}` },
    { label:  StudentAttendance.lecture_title, active: true },
  ]}
/>
      <SnapHeaderCollapse>
      <SnapHeader
        title="Student Summary"
        fields={[
          { label: 'Lecture Title', value: StudentAttendance.lecture_title },
          { label: 'Lecture Date', value: StudentAttendance.lecture_date },
          { label: 'Lecture Time', value: StudentAttendance.lecture_time }
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
                data={StudentAttendance}
                fields={[
                  { key: 'attendance_status', 
                    label: 'Attendance Status',
                 type: 'select',
                options: [
                    { label: 'PRESENT', value: 'PRESENT' },
                    { label: 'ABSENT', value: 'ABSENT' },
                    { label: '', value: '' },
                ] },
                ]}
                onSave={data => updateAttendance(id, data)}
              />
            ),
          }
         
        ]}
      />
    </>
  )
}

export default AttendanceDetailsPage