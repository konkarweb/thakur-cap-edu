import React from "react"
import { ProgressBar } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

const LiveClassSection = ({ lectures, loading }) => {
const navigate = useNavigate();

  if (loading) return <p>Loading live lectures...</p>

  if (!lectures.length)
    return <div className="alert alert-info">No Live Lectures Available</div>

  return (
    <div className="row">
      {lectures.map(lec => (
        <div key={lec.id} className="col-md-6 mb-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">

              <h5 className="fw-bold">{lec.title}</h5>

              <p className="mb-1">
                📅 {lec.date}
              </p>

              <p className="mb-2">
                🕒 {lec.time}
              </p>

              <span
                className={`badge ${
                  lec.attendanceStatus === "PRESENT"
                    ? "bg-success"
                    : lec.attendanceStatus === "ABSENT"
                    ? "bg-danger"
                    : "bg-secondary"
                }`}
              >
                {lec.attendanceStatus || "NOT MARKED"}
              </span>

              {/* Watch Button */}
              {console.log('Lecture Data →', lec)}
              {lec.videoId && (
                <>
                  <div className="mt-3">
                    <ProgressBar
                      now={lec.progress}
                      label={`${lec.progress}%`}
                    />
                  </div>

                  <button
                    className="btn btn-primary btn-sm mt-3"
                    onClick={() => 
                         navigate(`/dashboard/lecture-recording/${lec.attendance_id}`, {
                      state: { lecture: lec }
                    })
                    }
                  >
                    ▶ Watch Recording
                  </button>
                </>
              )}

            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LiveClassSection
