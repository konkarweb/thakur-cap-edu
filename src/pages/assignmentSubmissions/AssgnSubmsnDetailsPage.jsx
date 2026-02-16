import { useParams } from 'react-router-dom'
import React,  { useEffect, useState } from 'react'
import SnapHeader from '../../components/SnapHeader'
import EntityTabs from '../../components/EntityTabs'
import EntityDetailsForm from '../../components/EntityDetailsForm'
import Breadcrumbs from '../../components/Breadcrumbs'
import SnapHeaderCollapse from '../../components/SnapHeaderCollapse'
import AssignmentEnrolledTab from '../enrollment/tabs/EnrolledAssignments'
import { getStudentById,  getAssignmentSubmissionDetails} from '../../api/students.api'
import SubmissionThread from './SubmissionThread'
import AssignmentTaskCard from './AssignmentTaskCard'


const AssgnSubmsnDetailsPage = () => {
  const { id } = useParams()
  const {enrl_id} = useParams()

  const [submission, setSubmission] = useState(null)
  const [student, setStudent] = useState(null)


 // console.log('EnrollmentDetailsPage id:', enrollment)

  useEffect(() => {
     getAssignmentSubmissionDetails(id).then(res => setSubmission(res.data.data))
  }, [id])

    
    useEffect(() => {
       if (!submission?.student_id) return
    
        getStudentById(submission.student_id).then(res => setStudent(res.data.data))
        }, [submission?.student_id])

    if (!submission) return null
    

    //console.log('AssgnSubmsnDetailsPage submission:', submission.student_id)


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
to: `/dashboard/students/${submission.student_id}`,
},
]
: []),
    
    { label:  submission.assignment_title, active: true },
  ]}
/>
      <SnapHeaderCollapse>
      <SnapHeader
        title="Student Summary"
        fields={[
          { label: 'Assignment Title', value: submission.assignment_title },
          { label: 'Due Date', value: submission.due_date },
          { label: 'Submission Status', value: submission.submission_status },
          { label: 'Last Updated', value: submission.last_updated },
          { label: 'Submitted On', value: submission.submitted_on }
        ]}
      />
        </SnapHeaderCollapse>

   <div style={{ padding: '20px' }}>

<AssignmentTaskCard
assignment={{
title: submission.assignment_title,
description: submission.assignment_description,
due_date: submission.due_date,
image1: submission.image1,
image2: submission.image2,
image3: submission.image3,
image4: submission.image4,
image5: submission.image5,
image6: submission.image6,
image7: submission.image7,
}}
/>

  <SubmissionThread
    submissionId={id}
    studentId={submission.student_id}
  />
</div>
    </>
  )
}

export default AssgnSubmsnDetailsPage