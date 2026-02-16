import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import YouTube from 'react-youtube'
import Breadcrumbs from '../../components/Breadcrumbs'
import { getRecLecturePlayerData, updateRecLectureProgress } from '../../api/courseware.api'

const LectureRecording = () => {

  const { AttendanceId } = useParams()
  const auth = JSON.parse(localStorage.getItem('auth'))
  const studentId = auth?.user_id

  const [RecLecture, setRecLecture] = useState(null)
  const [player, setPlayer] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const progressInterval = useRef(null)

  /* ===============================
     Fetch Player Data
  =============================== */
  useEffect(() => {
    if (!AttendanceId|| !studentId) return

    getRecLecturePlayerData(AttendanceId, studentId)
      .then(res => {
        setRecLecture(res.data)
      })
      .catch(err => {
        console.error('Error loading rec lecture player', err)
      })

  }, [AttendanceId, studentId])

  /* ===============================
     Start Tracking When Playing
  =============================== */
  useEffect(() => {

    if (!player || !isPlaying) return

    progressInterval.current = setInterval(() => {

      const current = player.getCurrentTime()
      const duration = player.getDuration()

      if (!duration) return

      const percent = ((current / duration) * 100).toFixed(2)

      updateRecLectureProgress({
        attendance_id: AttendanceId,
        rec_last_watched_second: Math.floor(current),
        rec_watched_percent: percent >= 95 ? 100 :percent,
        rec_is_completed: percent >= 95 ? 1 : 0
      })

    }, 5000) // every 5 sec

    return () => {
      clearInterval(progressInterval.current)
    }

  }, [player, isPlaying])

  /* ===============================
     YouTube Events
  =============================== */

  const onReady = (event) => {
    setPlayer(event.target)

    // Resume from last position
    if (RecLecture?.data.rec_last_watched_second > 0) {
      event.target.seekTo(RecLecture.data.rec_last_watched_second, true)
    }
  }

  const onStateChange = (event) => {

    // 1 = Playing
    if (event.data === 1) {
      setIsPlaying(true)
    } 
    // 2 = Paused, 0 = Ended
    else if (event.data === 2 || event.data === 0) {
      setIsPlaying(false)
      clearInterval(progressInterval.current)
    }
  }

  if (!RecLecture) return <div className="text-center p-5">Loading...</div>


  console.log('Rec Lecture Player Data →', RecLecture) 
  
  return (
     <div className="container-fluid p-4">
        <Breadcrumbs
        items={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Courseware', to: '/dashboard/courseswares'},
          { label: RecLecture?.data?.lecture_title, active: true }
        ]}
      />

      <h4 className="fw-bold mb-3">{RecLecture?.data?.lecture_title} ( {RecLecture?.data?.lecture_date})</h4>
      <div className="card shadow border-0">
        <div className="card-body">

          <div className="ratio ratio-16x9">

            <YouTube
              videoId={RecLecture?.data?.video_id}
              onReady={onReady}
              onStateChange={onStateChange}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  modestbranding: 1,
                  rel: 0,
                  controls: 1,
                  disablekb: 0
                }
              }}
            />

          </div>

        </div>
      </div>

    </div>
  )
}

export default LectureRecording
