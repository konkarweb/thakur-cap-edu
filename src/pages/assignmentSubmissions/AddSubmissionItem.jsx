import React from 'react'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { createSubmissionItem } from '../../api/students.api'

const AddSubmissionItem = ({ submissionId, onSuccess }) => {
  const [content, setContent] = useState('')
  const [images, setImages] = useState([])
  const [saving, setSaving] = useState(false)

 const handleSubmit = async () => {
  setSaving(true)

  const formData = new FormData()
  formData.append('submission_id', submissionId)
  formData.append('descr', content)

  images.forEach((file, index) => {
    formData.append(`image${index + 1}`, file)
  })

  await createSubmissionItem(formData)

  setContent('')
  setImages([])
  setSaving(false)
  onSuccess()
}


   

  return (
    <div className="card mt-4">
      <div className="card-body">

        <h6 className="fw-semibold mb-2">Add Comment</h6>

        <ReactQuill
          value={content}
          onChange={setContent}
          placeholder="Write your response..."
        />

        <input
          type="file"
          multiple
          accept="image/*"
          className="form-control mt-3"
          onChange={e => setImages([...e.target.files].slice(0, 5))}
        />

        <div className="text-end mt-3">
          <button
            className="btn btn-primary"
            disabled={saving || !content}
            onClick={handleSubmit}
          >
            {saving ? 'Submitting...' : 'Submit'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default AddSubmissionItem