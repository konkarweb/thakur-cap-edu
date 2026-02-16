import React from 'react'

import { useNavigate } from "react-router-dom";

const EbookSection = ({ ebooks }) => {
  const navigate = useNavigate();

  if (!ebooks || ebooks.length === 0) {
    return <div className="alert alert-info">No ebooks available</div>;
  }

  return (
    <div className="row g-4">
      {ebooks.map(book => (
        <div key={book.id} className="col-md-6 col-lg-4">

          <div className="card shadow-sm border-0 h-100 hover-card">

            <div className="card-body">

              <h5 className="fw-bold">{book.title}</h5>

              {/* Progress */}
              <div className="mt-3">
                <div className="d-flex justify-content-between small">
                  <span>Progress</span>
                  <span>{book.progress}%</span>
                </div>

                <div className="progress" style={{ height: 8 }}>
                  <div
                    className="progress-bar"
                    style={{ width: `${book.progress}%` }}
                  />
                </div>
              </div>

              {/* Watch Button */}
              <div className="mt-4 text-end">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/dashboard/ebook-player/${book.progress_id}`, {
                      state: { book }
                    })
                  }
                >
                  ▶ Watch
                </button>
              </div>

            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default EbookSection;

