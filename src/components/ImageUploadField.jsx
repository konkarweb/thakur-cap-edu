import React from 'react'

const ImageUploadField = ({ value, onChange }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      onChange(file) // store file object
    }
  }

  const previewUrl =
    value instanceof File
      ? URL.createObjectURL(value)
      : value

  return (
    <div>
      {previewUrl && (
        <img
          src={previewUrl}
          alt="preview"
          style={{
            width: 120,
            height: 80,
            objectFit: 'cover',
            border: '1px solid #ddd',
            borderRadius: 6,
            marginBottom: 5,
          }}
        />
      )}

      <input
        type="file"
        className="form-control"
        onChange={handleFileChange}
      />
    </div>
  )
}

export default ImageUploadField