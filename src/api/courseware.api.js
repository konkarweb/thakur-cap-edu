import api from './axios'

/**
 * Get enrolled course by student
 */
export const getEnrolledCoursesByStudent = (user_id) =>
  api.get('/data/get_enrolled_course_by_student', {
    params: { user_id },
  })

/**
 * Get chapters by course ID
 */
export const getChaptersByCourse = (course_id) =>
  api.get('/data/get_chapters', {
    params: { CourseID: course_id },
  })

/**
 * Get topics + assignments by chapter ID
 */
export const getChapterContentById = (chapter_id) =>
  api.get('/data/get_topics', {
    params: { chapter_id },
  })

export const getAssignmentsByStudentByCourse = (enrollment_id) =>
  api.get('/data/get_assignments_by_student_by_course', {
    params: { enrollment_id },
  })


  export const getEbooksByStudentByCourse = (enrollment_id) =>
  api.get('/data/get_ebook_prg_by_student_by_course', {
    params: { enrollment_id },
  })

  export const getEbookPlayerData = (progress_id, student_id) =>
  api.get('/data/get_ebook_prg_by_id', {
    params: { progress_id, student_id }
  })

export const updateEbookProgress = (payload) =>
  api.post('/admin/update_ebook_progress', payload)


export const getLecturesWithAttendance = (enrollmentId) => api.get('/data/get_lec_attends_by_student_by_course', {
    params: { enrollment_id: enrollmentId }
  })