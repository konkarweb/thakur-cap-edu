import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import PrivateRoute from './auth/PrivateRoute'
import PublicRoute from './auth/PublicRoute'
import RoleRoute from './auth/RoleRoute'
import DashboardLayout from './components/layout/DashboardLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Unauthorized from "./pages/Unauthorized"
import ProfileView from './pages/profile/ProfileView'
import ProfileEdit from './pages/profile/ProfileEdit'
import ChangePassword from './pages/profile/ChangePassword'
import StudentsPage from './pages/students/StudentsPage'
import StudentDetailsPage from './pages/students/StudentDetailsPage'
import EnrollmentDetailsPage from './pages/enrollment/EnrollmentDetailsPage'  
import AssgnSubmsnDetailsPage from './pages/assignmentSubmissions/AssgnSubmsnDetailsPage'
import AttendanceDetailsPage from './pages/attendance/AttendanceDetailsPage'
import CoursewarePage from './pages/courseware/CoursewarePage'
import EbookPlayer from './pages/ebookplayer/EbookPlayer'
import LectureRecording from './pages/LectureRecording/LectureRecording'
import CoursesPage from './pages/courses/CoursesPage'
import CourseDetailsPage from './pages/courses/CourseDetailsPage'
import RegistrationDetailsPage from './pages/Registrations/RegistrationDetailsPage'
import ChapterDetailsPage from './pages/Chapters/ChapterDetailsPage'
import MonitorsPage from './pages/monitors/MonitorsPage'
import MonitorDetailsPage from './pages/monitors/MonitorDetailsPage'
import EbookDetailsPage from './pages/ebooks/EbookDetailsPage'
import AssignmentDetailsPage from './pages/assignment/AssignmentDetailsPage'
import TopicDetailsPage from './pages/topics/TopicDetailsPage'
import TopicViewPage from './pages/topicContent/TopicViewPage'
import LectureDetailsPage from './pages/Lectures/LectureDetailsPage'
import CourseTemplatesPage from './pages/CourseTemplate/CourseTemplatesPage'

function App() {
  return (
  
    <AuthProvider>
      <BrowserRouter>
        <Routes>
  <Route path="/" element={<Navigate to="/dashboard" replace />} />
  <Route
     path="/login" element={
    <PublicRoute><Login /></PublicRoute>
    } 
    />
  <Route path="/unauthorized" element={<Unauthorized />} />

  {/* Protected Dashboard routes */}
  <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
    <Route index element={<Dashboard />} />
    <Route path="students">
      <Route index element={<RoleRoute roles={["ADMIN", "MONITOR"]}><StudentsPage /></RoleRoute>} /> 
      <Route path=":id" element={<RoleRoute roles={["ADMIN", "MONITOR"]}><StudentDetailsPage /></RoleRoute>} />
      <Route path=":id/enrollment/:enrl_id" element={<RoleRoute roles={["ADMIN", "MONITOR"]}><EnrollmentDetailsPage /></RoleRoute>} />
    </Route>
    <Route path="monitors">
      <Route index element={<RoleRoute roles={["ADMIN"]}><MonitorsPage /></RoleRoute>} />
      <Route path=":id" element={<RoleRoute roles={["ADMIN"]}><MonitorDetailsPage /></RoleRoute>} />
    </Route>
    <Route path="assignment-submissions/:id/" element={<RoleRoute roles={["ADMIN", "MONITOR","STUDENT"]}><AssgnSubmsnDetailsPage /></RoleRoute>} />
    <Route path="topics/:topic_id" element={<TopicViewPage />} />
    <Route path="attendance/:id" element={<RoleRoute roles={["ADMIN", "MONITOR"]}><AttendanceDetailsPage /></RoleRoute>} />
    <Route path="courseswares" element={<RoleRoute roles={["STUDENT"]}><CoursewarePage /></RoleRoute>} />
    <Route path="courses">
      <Route index element={<RoleRoute roles={["ADMIN"]}><CoursesPage /></RoleRoute>} />
      <Route path=":id" element={<RoleRoute roles={["ADMIN"]}><CourseDetailsPage /></RoleRoute>} />
      <Route path=":id/registrations/:reg_id" element={<RoleRoute roles={["ADMIN"]}><RegistrationDetailsPage /></RoleRoute>} />
      <Route path=":id/chapters/:chapter_id" element={<RoleRoute roles={["ADMIN"]}><ChapterDetailsPage /></RoleRoute>} />
      <Route path=":id/ebooks/:ebook_id" element={<RoleRoute roles={["ADMIN"]}><EbookDetailsPage /></RoleRoute>} />
      <Route path=":id/lectures/:lecture_id" element={<RoleRoute roles={["ADMIN"]}><LectureDetailsPage /></RoleRoute>} />
      <Route path=":id/chapters/:chapter_id/assignments/:assignment_id" element={<RoleRoute roles={["ADMIN"]}><AssignmentDetailsPage /></RoleRoute>} />
      <Route path=":id/chapters/:chapter_id/topics/:topic_id" element={<RoleRoute roles={["ADMIN"]}><TopicDetailsPage /></RoleRoute>} />
    </Route>
    <Route path="course-templates" element={<RoleRoute roles={["ADMIN"]}><CourseTemplatesPage /></RoleRoute>} />
    
    <Route path="profile" element={<ProfileView />} />
    <Route path="profile/edit" element={<ProfileEdit />} />
    <Route path="profile/change-password" element={<ChangePassword />} />
    <Route path="ebook-player/:ProgressId" element={<RoleRoute roles={["STUDENT"]}><EbookPlayer /></RoleRoute>}  /> 
    <Route path="lecture-recording/:AttendanceId" element={<RoleRoute roles={["STUDENT"]}><LectureRecording /></RoleRoute>}  />
  </Route>
</Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
