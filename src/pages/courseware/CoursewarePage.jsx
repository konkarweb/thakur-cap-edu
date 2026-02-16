import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../components/Breadcrumbs'
import CourseSelector from '../../components/courseware/CourseSelector'
import ChapterTabs from '../../components/courseware/ChapterTabs'
import TopicCard from '../../components/courseware/TopicCard'
import AssignmentCard from '../../components/courseware/AssignmentCard'
import EbookSection from '../../components/courseware/Ebook'
import LiveClassSection from '../../components/courseware/LiveClassSection'
import {
  getEnrolledCoursesByStudent,
  getChaptersByCourse,
  getChapterContentById,
  getAssignmentsByStudentByCourse,
  getEbooksByStudentByCourse,
    getLecturesWithAttendance
} from '../../api/courseware.api'

const CoursewarePage = () => {

  const auth = JSON.parse(localStorage.getItem('auth'))
  const userId = auth?.user_id   // adjust if your key name differs

  const [activeTab, setActiveTab] = useState('chapters')

  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)

  const [chapters, setChapters] = useState([])
  const [selectedChapter, setSelectedChapter] = useState(null)

  const [topics, setTopics] = useState([])
  const [assignments, setAssignments] = useState([])

  const [enrollmentId, setEnrollmentId] = useState(null)
  const [allAssignments, setAllAssignments] = useState([])

  const [ebooks, setEbooks] = useState([])
  const [ebooksLoading, setEbooksLoading] = useState(false)

  const [liveLectures, setLiveLectures] = useState([])
  const [liveLoading, setLiveLoading] = useState(false)

  /* ===============================
     Load Enrolled Course
  =============================== */
  useEffect(() => {
    if (!userId) return

    getEnrolledCoursesByStudent(userId)
      .then(res => {
        const data = res.data.data

        if (!data) return

        // Your API returns single object → convert to array
        const courseObj = {
          id: data.CourseID,
          title: data.CourseTitle,
          type: data.CourseType,
          date: data.CourseDate
        }

        setCourses([courseObj])
        setSelectedCourse(courseObj)
         setEnrollmentId(data.enrollment_id)
      })
      .catch(err => {
        console.error('Error fetching enrolled course', err)
      })

  }, [userId])


  /* ===============================
     Load Chapters When Course Changes
  =============================== */
 useEffect(() => {
  if (!selectedCourse?.id) return

  setChapters([])
  setSelectedChapter(null)
  setTopics([])
  setAssignments([])

  getChaptersByCourse(selectedCourse.id)
    .then(res => {
      const rawData = res.data.data || []

      // Normalize backend structure → UI friendly structure
      const formattedChapters = rawData
        .filter(ch => ch.is_active === 1)
        .sort((a, b) => a.chapter_order - b.chapter_order)
        .map(ch => ({
          id: ch.chapter_id,
          title: ch.chapter_title,
          subTitle: ch.chapter_sub_title,
          order: ch.chapter_order
        }))

      setChapters(formattedChapters)

      if (formattedChapters.length > 0) {
        setSelectedChapter(formattedChapters[0])
      }
    })
    .catch(err => {
      console.error('Error fetching chapters', err)
    })

}, [selectedCourse])

useEffect(() => {
  if (!enrollmentId) return

  getAssignmentsByStudentByCourse(enrollmentId)
    .then(res => {
      const rawAssignments = res.data.data || []

      const formattedAssignments = rawAssignments.map(assign => ({
        id: assign.assignment_id,
        chapterId: assign.chapter_id,
        title: assign.assignment_title,
        dueDate: assign.due_date,
        status: assign.submission_status,
        submission_id: assign.submission_id
      }))

      setAllAssignments(formattedAssignments)
    })
    .catch(err => {
      console.error('Error fetching assignments', err)
    })

}, [enrollmentId])

  /* ===============================
     Load Topics + Assignments
  =============================== */
 useEffect(() => {
  if (!selectedChapter?.id) return

  setTopics([])
  setAssignments([])

  getChapterContentById(selectedChapter.id)
    .then(res => {
      const rawData = res.data || {}

      const rawTopics = rawData.topics || []

      const formattedTopics = rawTopics
        .filter(topic => topic.is_active === 1)
        .sort((a, b) => a.topic_order - b.topic_order)
        .map(topic => ({
          id: topic.topic_id,
          title: topic.topic_title,
          pdfUrl: topic.pdf_url,
          order: topic.topic_order
        }))

      setTopics(formattedTopics)

      const chapterAssignments = allAssignments.filter(
        assign => assign.chapterId === selectedChapter.id
      )

      setAssignments(chapterAssignments)
    })
    .catch(err => {
      console.error('Error fetching chapter content', err)
    })

}, [selectedChapter, allAssignments])

useEffect(() => {
  if (!enrollmentId || activeTab !== 'ebooks') return

  setEbooksLoading(true)

  getEbooksByStudentByCourse(enrollmentId)
    .then(res => {
      const rawData = res.data?.data || []

      const formattedEbooks = rawData
        .filter(book => book.is_active === 1)
        .sort((a, b) => a.ebook_order - b.ebook_order)
        .map(book => ({
          id: book.ebook_id,
          title: book.book_name,
          videoId: book.video_id,
          platform: book.video_platform,
          duration: book.duration_seconds,
          progress: parseFloat(book.watched_percent),
          progress_id: book.progress_id,
          completed: book.is_completed === 1
        }))

      setEbooks(formattedEbooks)
    })
    .catch(err => {
      console.error('Error fetching ebooks', err)
    })
    .finally(() => {
      setEbooksLoading(false)
    })

}, [enrollmentId, activeTab])

useEffect(() => {
  if (!enrollmentId || activeTab !== 'live') return

  setLiveLoading(true)

  getLecturesWithAttendance(enrollmentId)
    .then(res => {
      const rawData = res.data?.data || []

      const formatted = rawData.map(lec => ({
        attendance_id: lec.attendance_id,
        id: lec.lecture_id,
        title: lec.lecture_title,
        date: lec.lecture_date,
        time: lec.lecture_time,
        attendanceStatus: lec.attendance_status,
        videoId: lec.video_id, // Add in backend later
        progress: parseFloat(lec.rec_watched_percent || 0),
        completed: lec.is_completed === 1
      }))

      setLiveLectures(formatted)
    })
    .catch(err => {
      console.error("Error fetching lectures", err)
    })
    .finally(() => {
      setLiveLoading(false)
    })

}, [enrollmentId, activeTab])




  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Courseware', active: true }
        ]}
      />

      <div style={{ padding: '20px' }}>

        {/* Course Selector */}
        <CourseSelector
          courses={courses}
          selectedCourse={selectedCourse}
          onSelect={setSelectedCourse}
        />
<ul className="nav nav-tabs mb-3">
  <li className="nav-item">
    <button
      className={`nav-link ${activeTab === 'chapters' ? 'active' : ''}`}
      onClick={() => setActiveTab('chapters')}
    >
      Chapters
    </button>
  </li>

  <li className="nav-item">
    <button
      className={`nav-link ${activeTab === 'live' ? 'active' : ''}`}
      onClick={() => setActiveTab('live')}
    >
      Live Classes
    </button>
  </li>

  <li className="nav-item">
    <button
      className={`nav-link ${activeTab === 'ebooks' ? 'active' : ''}`}
      onClick={() => setActiveTab('ebooks')}
    >
      Ebooks
    </button>
  </li>
</ul>


      {/* ===== CONDITIONAL SECTIONS ===== */}
      {activeTab === "chapters" && (
        <>
        {/* Chapter Tabs */}
        <ChapterTabs
          chapters={chapters}
          selectedChapter={selectedChapter}
          onSelect={setSelectedChapter}
        />

        {/* Topics */}
        {topics.map(topic => (
          <TopicCard key={topic.id} topic={topic} />
        ))}

        {/* Assignments */}
        {assignments.map(assign => (
          <AssignmentCard key={assign.id} assignment={assign} />
        ))}
         </>
      )}

     {activeTab === "ebooks" && (
  <EbookSection
    ebooks={ebooks}
    loading={ebooksLoading}
  />
)}

  {activeTab === "live" && (
  <LiveClassSection
    lectures={liveLectures}
    loading={liveLoading}
  />
)}


      </div>
    </>
    
  )
}

export default CoursewarePage
