import api from './axios'

const toArray = (payload) => {
  if (!payload) return []
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.monitors)) return payload.monitors
  if (Array.isArray(payload.data)) return payload.data
  if (payload.data && typeof payload.data === 'object') return [payload.data]
  if (typeof payload === 'object') return [payload]
  return []
}

const normalizeMonitor = (item = {}) => ({
  ...item,
  monitor_id: item.monitor_id ?? item.user_id ?? item.id ?? item.MonitorID ?? '',
  full_name: item.full_name ?? item.monitor_name ?? item.name ?? item.Fname ?? '',
  monitor_name: item.monitor_name ?? item.full_name ?? item.name ?? item.Fname ?? '',
  email: item.email ?? item.monitor_email ?? item.EmailID ?? '',
  phone: item.phone ?? item.mobile ?? item.ContactNo ?? item.contact_no ?? '',
  is_active: item.is_active ?? item.active ?? item.IsActive ?? item.status ?? '',
  total_students: item.total_students ?? item.TotalStudents ?? 0,
  role: item.role ?? 'MONITOR',
})

export const getStudents = (filters = {}) => {
  return api.get('/data/get_students', {
    params: filters, // future ready
  })
}

export const getMonitors = async (filters = {}) => {
  const res = await api.get('/data/get_monitors', {
    params: filters,
  })

  return {
    ...res,
    data: {
      ...res.data,
      data: toArray(res.data).map(normalizeMonitor),
    },
  }
}

export const getMonitorById = async (monitor_id) => {
  const res = await api.get('/data/get_monitor', {
    params: { monitor_id },
  })

  const [monitor] = toArray(res.data).map(normalizeMonitor)

  return {
    ...res,
    data: {
      ...res.data,
      data: monitor ?? null,
    },
  }
}

export const updateMonitor = (monitor_id, payload) => {
  return api.post('/admin/update_monitor', {
    monitor_id,
    ...payload,
  })
}

export const createMonitor = (payload) => {
  return api.post('/admin/create_monitor', payload)
}


export const createTopic = (payload) => {
  return api.post('/admin/create_topic', payload)
}

export const updateTopic = (topic_id, payload) => {
  return api.post('/admin/update_topic', {
    topic_id,
    ...payload,
  })
}

export const uploadTopicImage = (file) => {
  const formData = new FormData()
  formData.append('image', file)

  return api.post('/admin/upload_image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const getTopicById = (topic_id) => {
return api.get('/data/get_topic', {
params: { topic_id },
})
}

export const getCoursesWithNoOfRegistration = (filters = {}) => {
  return api.get('/data/get_courses_with_no_reg', {
    params: filters, // future ready
  })
}

export const getCourseById = (CourseID) => {
return api.get('/data/get_course', {
params: { CourseID: CourseID },
})
}


export const updateCourse = (CourseID, payload) => {
  console.log('UPDATE COURSE', CourseID, payload)

  return api.post('/admin/update_course', {
    CourseID,
    ...payload
  })
}

export const createCourse = (payload) => {
  console.log('CREATE COURSE', payload)

  return api.post('/admin/create_course', payload)
}

export const getChapterById = (chapter_id) =>
  api.get('/data/get_chapter', {
    params: { chapter_id },
  })

export const updateChapter = (chapter_id, payload) =>
  api.post('/admin/update_chapter', {
    chapter_id,
    ...payload,
  })

export const createChapter = (payload) =>
  api.post('/admin/create_chapter', payload)

export const getTopicsByChapter = (chapter_id) =>
  api.get('/data/get_topics', {
    params: { chapter_id },
  })

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


export const getRegistrationsByCourse = (CourseID) =>
api.get('/data/get_registrations_by_course', {
params: { CourseID },
})

export const getChaptersByCourse = (CourseID) =>
  api.get('/data/get_chapters', {
    params: { CourseID },
  })

export const getRegistrationById = (RegID) =>
  api.get('/data/get_registration', {
    params: { RegID },
  })

export const updateRegistration = (RegID, payload) =>
  api.post('/admin/update_registration', {
    RegID,
    ...payload,
  })

export const createRegistration = (payload) =>
  api.post('/admin/create_registration', payload)

// 🔥 EBOOK APIs

export const getEbooksByCourse = (CourseID) =>
  api.get('/data/get_ebooks', {
    params: { CourseID },
  })

export const getEbookById = (ebook_id) =>
  api.get('/data/get_ebook', {
    params: { ebook_id },
  })

export const createEbook = (payload) =>
  api.post('/admin/create_ebook', payload)

export const updateEbook = (ebook_id, payload) =>
  api.post('/admin/update_ebook', {
    ebook_id,
    ...payload,
  })


  // 🔥 ASSIGNMENT APIs

export const getAssignmentsByChapter = (chapter_id) =>
  api.get('/data/get_assignments_by_chapter', {
    params: { chapter_id },
  })

export const getAssignmentById = (assignment_id) =>
  api.get('/data/get_assignment', {
    params: { assignment_id },
  })

export const createAssignment = (payload) =>
  api.post('/admin/create_assignment', payload,{
     headers: { 'Content-Type': 'multipart/form-data' },
  })

export const updateAssignment = (assignment_id, payload) =>
  api.post('/admin/update_assignment', {
    assignment_id,
    ...payload
  }, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export const getLecturesByCourse = (CourseID) =>
  api.get(`/data/get_lectures`, {
    params: { CourseID },
  })

  export const getStudentDashboard = (courseId) => 
  {
    return {
  "course_id": 51,
  "course_title": "Stock Market Made Easy",

  "progress": {
    "chapters_total": 10,
    "chapters_completed": 5,

    "lectures_total": 20,
    "lectures_completed": 12,

    "ebooks_total": 5,
    "ebooks_completed": 3,

    "overall_percent": 65
  },

  "attendance": {
    "present": 15,
    "absent": 2,
    "not_marked": 3,
    "attendance_percent": 88
  },

  "continue_learning": {
    "lecture_id": 5,
    "lecture_title": "Basics & History of Stock Market",
    "watched_percent": 45
  },

  "upcoming_lectures": [
    {
      "lecture_id": 10,
      "title": "Technical Analysis",
      "date": "2026-06-01",
      "time": "22:00:00"
    }
  ]
}
  }
 

export const getLectureById = (lecture_id) =>
  api.get('/data/get_lecture', {
    params: { lecture_id },
  })



export const createLecture = (payload) =>
  api.post('/admin/create_lecture', payload)

export const updateLecture = (lecture_id, payload) =>
  api.put(`/admin/update_lecture`, {
    lecture_id,
    ...payload
  })

  export const syncCourse = (payload) =>
  api.post('/admin/sync_course', payload)

   export const sync_lms_student = (payload) =>
  api.post('/admin/sync_lms_student', payload)

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
