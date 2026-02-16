import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import YouTube from 'react-youtube'
import Breadcrumbs from '../../components/Breadcrumbs'
import { getEbookPlayerData, updateEbookProgress } from '../../api/courseware.api'

const EbookPlayer = () => {

  const { ProgressId } = useParams()
  const auth = JSON.parse(localStorage.getItem('auth'))
  const studentId = auth?.user_id

  const [ebook, setEbook] = useState(null)
  const [player, setPlayer] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const progressInterval = useRef(null)

  /* ===============================
     Fetch Player Data
  =============================== */
  useEffect(() => {
    if (!ProgressId|| !studentId) return

    getEbookPlayerData(ProgressId, studentId)
      .then(res => {
        setEbook(res.data)
      })
      .catch(err => {
        console.error('Error loading ebook player', err)
      })

  }, [ProgressId, studentId])

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

      updateEbookProgress({
        progress_id: ProgressId,
        last_watched_second: Math.floor(current),
        watched_percent: percent,
        is_completed: percent >= 95 ? 1 : 0
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
    if (ebook?.data.last_watched_second > 0) {
      event.target.seekTo(ebook.data.last_watched_second, true)
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

  if (!ebook) return <div className="text-center p-5">Loading...</div>


  console.log('Ebook Player Data →', ebook) 
  
  return (
     <div className="container-fluid p-4">
        <Breadcrumbs
        items={[
          { label: 'Home', to: '/dashboard' },
          { label: 'Courseware', to: '/dashboard/courseswares'},
          { label: ebook.data.book_name, active: true }
        ]}
      />

      <h4 className="fw-bold mb-3">{ebook.data.book_name}</h4>

      <div className="card shadow border-0">
        <div className="card-body">

          <div className="ratio ratio-16x9">

            <YouTube
              videoId={ebook.data.video_id}
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

export default EbookPlayer
