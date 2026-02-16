import api from './axios'

export const getStudents = (filters = {}) => {
  return api.get('/data/get_students', {
    params: filters, // future ready
  })
}

// DETAILS (BY ID)
export const getStudentById = (userId) => {
return api.get('/data/get_student', {
params: { user_id: userId },
})
}

export const updateStudent = (user_id, payload) => {
console.log('UPDATE STUDENT (mock)', user_id, payload)


// 🔜 Future real API call
// return api.post('/data/update_student', payload)


// ✅ Mock resolved promise so UI continues working
return Promise.resolve({
data: {
success: true,
data: payload,
},
})
}


export const updateAttendance = (attendance_id, payload) => {
  console.log('UPDATE ATTENDANCE', attendance_id, payload)

  return api.post('/admin/update_attendance', {
    attendance_id,
    ...payload
  })
}


export const getEnrolledCoursesByStudent = (user_id) =>
api.get('/data/get_enrolled_course_by_student', {
params: { user_id },
})

export const getEnrollmentDetails = (enrollment_id) =>
api.get('/data/get_enrolled_course_by_id', {
params: { enrollment_id },
})

export const getStudentAssignments = (enrollment_id) =>
api.get('/data/get_assignments_by_student_by_course', {
params: { enrollment_id },
})

export const getStudentEbooksPrgs = (enrollment_id) =>
api.get('/data/get_ebook_prg_by_student_by_course', {
params: { enrollment_id },
})
export const getAssignmentSubmissionDetails = (submission_id) =>
api.get('/data/get_assgn_submsn_by_id', {
params: { submission_id },
})

export const getStudentAttendance = (enrollment_id) =>
api.get('/data/get_lec_attends_by_student_by_course', {
params: { enrollment_id },
})

export const getStudentAttendanceByID = (attendance_id) =>
api.get('/data/get_lec_attends_by_id', {
params: { attendance_id },
})

export const getSubmissionItems = (submissionId) =>
  api.get(`/data/get_assgn_submission_items`, {
    params: { submission_id: submissionId },
  })

export const createSubmissionItem = (formData) => {
return api.post(
'/admin/create_assignment_submission_item',
formData,
{
headers: {
'Content-Type': 'multipart/form-data'
}
}
)
}