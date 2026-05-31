import React, { useMemo, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LiveClassSection = ({ lectures = [], loading }) => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    courseName: "",
    status: "ALL",
    tag: "",
    sort: "DESC",
  });

  const availableTags = useMemo(() => {
    const tags = new Set();

    lectures.forEach((lecture) => {
      if (lecture.tag) {
        lecture.tag.split(",").forEach((tag) => {
          const cleanTag = tag.trim();

          if (cleanTag) {
            tags.add(cleanTag);
          }
        });
      }
    });

    return Array.from(tags).sort();
  }, [lectures]);

  const filteredLectures = useMemo(() => {
    let result = [...lectures];

    const now = new Date();

    // Course Name Filter
    if (filters.courseName) {
      result = result.filter((lecture) =>
        (
          lecture.courseTitle ||
          lecture.CourseTitle ||
          ""
        )
          .toLowerCase()
          .includes(filters.courseName.toLowerCase())
      );
    }

    // Upcoming / Completed Filter
    if (filters.status !== "ALL") {
      result = result.filter((lecture) => {
        const lectureDate =
          lecture.date || lecture.lecture_date;

        const lectureTime =
          lecture.time || lecture.lecture_time;

        const lectureDateTime = new Date(
          `${lectureDate}T${lectureTime}`
        );

        if (filters.status === "UPCOMING") {
          return lectureDateTime > now;
        }

        if (filters.status === "COMPLETED") {
          return lectureDateTime <= now;
        }

        return true;
      });
    }

    // Tag Filter
    if (filters.tag) {
      result = result.filter((lecture) =>
        lecture.tag
          ?.split(",")
          .map((t) => t.trim())
          .includes(filters.tag)
      );
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(
        `${a.date || a.lecture_date}T${
          a.time || a.lecture_time
        }`
      );

      const dateB = new Date(
        `${b.date || b.lecture_date}T${
          b.time || b.lecture_time
        }`
      );

      return filters.sort === "ASC"
        ? dateA - dateB
        : dateB - dateA;
    });

    return result;
  }, [lectures, filters]);

  if (loading) {
    return <p>Loading live lectures...</p>;
  }

  if (!lectures.length) {
    return (
      <div className="alert alert-info">
        No Live Lectures Available
      </div>
    );
  }

  return (
    <>
      {/* Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">

            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search By Course Name"
                value={filters.courseName}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    courseName: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={filters.status}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    status: e.target.value,
                  })
                }
              >
                <option value="ALL">
                  All Lectures
                </option>
                <option value="UPCOMING">
                  Upcoming
                </option>
                <option value="COMPLETED">
                  Completed
                </option>
              </select>
            </div>

            <div className="col-md-2">
              <select
                className="form-select"
                value={filters.tag}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    tag: e.target.value,
                  })
                }
              >
                <option value="">
                  All Tags
                </option>

                {availableTags.map((tag) => (
                  <option
                    key={tag}
                    value={tag}
                  >
                    {tag}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={filters.sort}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    sort: e.target.value,
                  })
                }
              >
                <option value="DESC">
                  Newest First
                </option>
                <option value="ASC">
                  Oldest First
                </option>
              </select>
            </div>

          </div>
        </div>
      </div>

      {/* Lecture Cards */}
      <div className="row">
        {filteredLectures.map((lec) => {
          console.log("Lecture:", lec);
console.log("Tag:", lec.tag);
          const lectureDate =
            lec.date || lec.lecture_date;

          const lectureTime =
            lec.time || lec.lecture_time;

          const lectureDateTime = new Date(
            `${lectureDate}T${lectureTime}`
          );

          const isUpcoming =
            lectureDateTime > new Date();

          return (
            <div
              key={
                lec.lecture_id ||
                lec.id
              }
              className="col-md-6 mb-4"
            >
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">

                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="fw-bold mb-0">
                      {lec.lecture_title ||
                        lec.title}
                    </h5>

                    <span
                      className={`badge ${
                        isUpcoming
                          ? "bg-warning text-dark"
                          : "bg-success"
                      }`}
                    >
                      {isUpcoming
                        ? "Upcoming"
                        : "Completed"}
                    </span>
                  </div>

                  <p className="text-muted small mb-2">
                    {lec.CourseTitle ||
                      lec.courseTitle}
                  </p>

                  <p className="mb-1">
                    📅 {lectureDate}
                  </p>

                  <p className="mb-2">
                    🕒 {lectureTime}
                  </p>

                  {/* Tags */}
                  {lec.tag && (
                    <div className="mb-3">
                      {lec.tag
                        .split(",")
                        .map((tag) =>
                          tag.trim()
                        )
                        .filter(Boolean)
                        .map((tag) => (
                          <span
                            key={tag}
                            className="badge bg-primary me-1 mb-1"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  )}

                  {/* Attendance */}
                  <span
                    className={`badge ${
                      lec.attendanceStatus ===
                      "PRESENT"
                        ? "bg-success"
                        : lec.attendanceStatus ===
                          "ABSENT"
                        ? "bg-danger"
                        : "bg-secondary"
                    }`}
                  >
                    {lec.attendanceStatus ||
                      lec.attendance_status ||
                      "NOT MARKED"}
                  </span>

                  {/* Recording */}
                  {(lec.videoId ||
                    lec.video_id) && (
                    <>
                      <div className="mt-3">
                        <ProgressBar
                          now={
                            lec.progress ||
                            lec.rec_watched_percent ||
                            0
                          }
                          label={`${
                            lec.progress ||
                            lec.rec_watched_percent ||
                            0
                          }%`}
                        />
                      </div>

                      <button
                        className="btn btn-primary btn-sm mt-3"
                        onClick={() =>
                          navigate(
                            `/dashboard/lecture-recording/${lec.attendance_id}`,
                            {
                              state: {
                                lecture: lec,
                              },
                            }
                          )
                        }
                      >
                        ▶ Watch Recording
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!filteredLectures.length && (
        <div className="alert alert-warning">
          No lectures found matching selected
          filters.
        </div>
      )}
    </>
  );
};

export default LiveClassSection;