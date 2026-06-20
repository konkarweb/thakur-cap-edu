import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getStudentDashboard } from "../api/students.api";

export default function CourseDashboard() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response = await getStudentDashboard();

      console.log("Dashboard Response", response.data);

      setCourses(response?.data?.courses || []);
    } catch (error) {
      console.error("Dashboard Error", error);
    } finally {
      setLoading(false);
    }
  };

  const totalCourses = courses.length;

  const totalLectures = courses.reduce(
    (sum, c) => sum + (c.total_lectures || 0),
    0
  );

  const completedLectures = courses.reduce(
    (sum, c) => sum + (c.completed_lectures || 0),
    0
  );

  const totalEbooks = courses.reduce(
    (sum, c) => sum + (c.total_ebooks || 0),
    0
  );

  const completedEbooks = courses.reduce(
    (sum, c) => sum + (c.completed_ebooks || 0),
    0
  );

  const totalAssignments = courses.reduce(
  (sum, c) => sum + (c.total_assignments || 0),
  0
);

const submittedAssignments = courses.reduce(
  (sum, c) => sum + (c.submitted_assignments || 0),
  0
);

  const avgProgress =
    totalCourses > 0
      ? Math.round(
          courses.reduce(
            (sum, c) => sum + (c.overall_progress || 0),
            0
          ) / totalCourses
        )
      : 0;

  if (loading) {
    return (
      <div className="text-center p-5">
        <h5>Loading Dashboard...</h5>
      </div>
    );
  }

  if (!courses.length) {
    return (
      <div className="alert alert-info">
        No Enrolled Courses Found
      </div>
    );
  }

  return (
    <div className="container-fluid">

      {/* Dashboard Summary */}

      <div className="row mb-4">

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h6 className="text-muted">
                Total Courses
              </h6>
              <h2>{totalCourses}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h6 className="text-muted">
                Overall Progress
              </h6>
              <h2>{avgProgress}%</h2>
            </div>
          </div>
        </div>

        <div className="col-md-2 mb-2">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h6 className="text-muted">
                Recordedings
              </h6>
              <h2>
                {completedLectures}/{totalLectures}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-2 mb-2">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h6 className="text-muted">
                Ebooks
              </h6>
              <h2>
                {completedEbooks}/{totalEbooks}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-2 mb-2">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h6 className="text-muted">
                Assignments
              </h6>

              <h2>
                {submittedAssignments}
                /
                {totalAssignments}
              </h2>
            </div>
          </div>
        </div>

      </div>

      {/* Course Cards */}

      <div className="row">

        {courses.map((course) => (

          <div
            key={course.course_id}
            className="col-lg-12 mb-12"
          >

            <div className="card shadow-sm border-0 h-100">

              <div className="card-body">

                {/* Course Header */}

                <div className="d-flex justify-content-between">

                  <div>

                    <h5 className="fw-bold">
                      {course.course_title}
                    </h5>

                    <div className="text-muted">
                      {course.course_subtitle}
                    </div>

                    <div className="mt-2">

                      <span className="badge bg-primary me-2">
                        {course.course_type}
                      </span>

                    </div>

                    <div className="mt-2 text-muted">
                      📅 {course.course_date}
                    </div>

                    <div className="text-muted">
                      🌐 {course.language}
                    </div>

                  </div>

                  <div className="text-end">

                    <div className="text-muted small">
                      Progress
                    </div>

                    <h3>
                      {course.overall_progress}%
                    </h3>

                  </div>

                </div>

                {/* Progress Bar */}

                <div className="mt-3">

                  <ProgressBar
                    now={course.overall_progress}
                    label={`${course.overall_progress}%`}
                  />

                </div>

                {/* Stats */}

                <div className="row mt-4">

  <div className="col-6 mb-3">
    <div className="border rounded p-2 text-center">
      <small className="text-muted">
        Chapters
      </small>
      <h5>
        {course.total_chapters}
      </h5>
    </div>
  </div>

  <div className="col-6 mb-3">
    <div className="border rounded p-2 text-center">
      <small className="text-muted">
        Topics
      </small>
      <h5>
        {course.total_topics}
      </h5>
    </div>
  </div>

  <div className="col-6 mb-3">
    <div className="border rounded p-2 text-center">
      <small className="text-muted">
        Recordings
      </small>

      <h5>
        {course.completed_lectures}
        /
        {course.total_lectures}
      </h5>
    </div>
  </div>

  <div className="col-6 mb-3">
    <div className="border rounded p-2 text-center">
      <small className="text-muted">
        Ebooks
      </small>

      <h5>
        {course.completed_ebooks}
        /
        {course.total_ebooks}
      </h5>
    </div>
  </div>

  <div className="col-12 mb-3">
    <div className="border rounded p-2 text-center">

      <small className="text-muted">
        Assignments
      </small>

      <h5>
        {course.submitted_assignments}
        /
        {course.total_assignments}
      </h5>

    </div>
  </div>

</div>

                {/* Attendance */}

                <div className="mb-4">

                  <h6>
                    Attendance
                  </h6>

                  <ProgressBar
                    now={course.attendance_percent}
                    label={`${course.attendance_percent}%`}
                  />

                </div>

                {/* Continue Learning */}

                <div className="mb-4">

                  <h6>
                    Continue Learning
                  </h6>

                  {course.continue_learning ? (
                    <>
                      <div>
                        {
                          course.continue_learning
                            .lecture_title
                        }
                      </div>

                      <ProgressBar
                        className="mt-2"
                        now={
                          course.continue_learning
                            .rec_watched_percent || 0
                        }
                        label={`${
                          course.continue_learning
                            .rec_watched_percent || 0
                        }%`}
                      />
                    </>
                  ) : (
                    <div className="text-muted">
                      No Lecture Started Yet
                    </div>
                  )}

                </div>

                <div className="mb-4">

  <h6>
    Assignments
  </h6>

  <div className="mb-2">

    <span className="badge bg-success me-2">
      Submitted:
      {" "}
      {course.submitted_assignments}
    </span>

    <span className="badge bg-warning text-dark">
      Pending:
      {" "}
      {course.pending_assignments}
    </span>

  </div>

  {course.next_assignment ? (
    <div>

      <div className="fw-semibold">
        {course.next_assignment.title}
      </div>

      <small className="text-danger">
        Due:
        {" "}
        {course.next_assignment.due_date}
      </small>

    </div>
  ) : (
    <div className="text-muted">
      No Pending Assignments
    </div>
  )}

</div>

                {/* Upcoming Lecture */}

                <div className="mb-4">

                  <h6>
                    Next Live Class
                  </h6>

                  {course.next_lecture ? (
                    <>
                      <div className="fw-semibold">
                        {
                          course.next_lecture
                            .lecture_title
                        }
                      </div>

                      <small className="text-muted">
                        {
                          course.next_lecture
                            .lecture_date
                        }
                        {" "}
                        {
                          course.next_lecture
                            .lecture_time
                        }
                      </small>
                    </>
                  ) : (
                    <div className="text-muted">
                      No Upcoming Lectures
                    </div>
                  )}

                </div>

                {/* Open Course */}

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(
                      `/dashboard/courseware/${course.enrollment_id}`
                    )
                  }
                >
                  Open Course
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}