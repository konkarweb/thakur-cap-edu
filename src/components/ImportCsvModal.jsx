import React, { useState } from 'react'

const ImportCsvModal = ({
  show,
  onClose,
  uploadApi,
  onSuccess,
}) => {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  if (!show) return null

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a CSV file')
      return
    }

    try {
      setLoading(true)

      const res = await uploadApi(file)

      alert( `Import Completed

Inserted : ${res.data.inserted || 0}
Updated  : ${res.data.updated || 0}
Failed   : ${res.data.failed || 0}`)

      onSuccess?.()

      onClose()
    } catch (err) {
      console.error(err)
      alert('Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="modal fade show"
      style={{
        display: 'block',
        backgroundColor: 'rgba(0,0,0,.5)',
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              Import CSV
            </h5>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            />
          </div>

          <div className="modal-body">

            <input
              type="file"
              accept=".csv"
              className="form-control"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
            />

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="btn btn-primary"
              disabled={loading}
              onClick={handleUpload}
            >
              {loading
                ? 'Uploading...'
                : 'Upload'}
            </button>

          </div>

        </div>
      </div>
    </div>
  )
}

export default ImportCsvModal