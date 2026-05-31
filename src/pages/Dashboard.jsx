import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { getStudentDashboard } from "../api/students.api";
import { useParams } from "react-router-dom";

export default function CourseDashboard() {
  const { courseId } = 51;

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, [courseId]);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response = await getStudentDashboard(courseId);

      console.log("Dashboard Response", response);

      setDashboard(response.data || response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        Loading Dashboard...
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="alert alert-warning">
        Dashboard data not found.
      </div>
    );
  }

  return (
    <div className="container-fluid">

      <div className="row">

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6>Course Progress</h6>
              <h2>
                {dashboard?.progress?.overall_percent || 0}%
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6>Attendance</h6>
              <h2>
                {dashboard?.attendance?.attendance_percent || 0}%
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6>Lectures Completed</h6>
              <h2>
                {dashboard?.progress?.lectures_completed || 0}
                /
                {dashboard?.progress?.lectures_total || 0}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6>Ebooks Completed</h6>
              <h2>
                {dashboard?.progress?.ebooks_completed || 0}
                /
                {dashboard?.progress?.ebooks_total || 0}
              </h2>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <h5>Continue Learning</h5>

          <h6>
            {dashboard?.continue_learning?.lecture_title ||
              "No lecture found"}
          </h6>

          <ProgressBar
            now={
              dashboard?.continue_learning?.watched_percent || 0
            }
            label={`${dashboard?.continue_learning?.watched_percent || 0}%`}
          />
        </div>
      </div>

      <div className="card shadow-sm mt-4">
        <div className="card-body">

          <h5>Upcoming Live Classes</h5>

          {dashboard?.upcoming_lectures?.length ? (
            dashboard.upcoming_lectures.map((lecture) => (
              <div
                key={lecture.lecture_id}
                className="border-bottom py-2"
              >
                <div>{lecture.title}</div>

                <small>
                  {lecture.date} {lecture.time}
                </small>
              </div>
            ))
          ) : (
            <p>No Upcoming Lectures</p>
          )}

        </div>
      </div>

    </div>
  );
}