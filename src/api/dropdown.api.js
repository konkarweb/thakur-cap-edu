import api from './axios'


/**
 * Generic Dropdown API
 */


export const fetchDropdown = async (url, params = {}) => {
  try {
    const res = await api.get(url, { params })
    return res.data?.data || []
  } catch (error) {
    console.error("Dropdown API error:", error)
    return []
  }
}

/**
 * Specific APIs
 */

export const getCoursesWithNoOfRegistration = (filters = {}) => {
  return api.get('/data/get_courses_with_no_reg', {
    params: filters, // future ready
  })
}
export const getCourseTypes = () =>
  fetchDropdown("/data/get_course_types")

export const getCoursesByType = (CourseType) =>
  fetchDropdown("/data/get_courses_with_no_reg", { CourseType })

export const getIsActiveOptions = async () => {
  return [
    { label: "Yes", value: "1" },
    { label: "No", value: "0" }
  ]
}