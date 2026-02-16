import React, { useEffect, useState } from 'react'

const EntityDetailsForm = ({
  fields = [],
  data = {},
  onSave,
  loading = false,
}) => {
  const [mode, setMode] = useState('view') // view | edit
  const [form, setForm] = useState(data)
  const [original, setOriginal] = useState(data)

  useEffect(() => {
    setForm(data)
    setOriginal(data)
  }, [data])

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    await onSave(form)
    setOriginal(form)
    setMode('view')
  }

  const handleCancel = () => {
    setForm(original)
    setMode('view')
  }

  const isDirty = JSON.stringify(form) !== JSON.stringify(original)

  return (
    <>
      {/* Action buttons */}
      <div className="d-flex justify-content-end gap-2 mb-3">
        {mode === 'view' && (
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => setMode('edit')}
          >
            ✏️ Edit
          </button>
        )}

        {mode === 'edit' && (
          <>
            <button
              className="btn btn-sm btn-success"
              onClick={handleSave}
              disabled={!isDirty || loading}
            >
              💾 Save
            </button>

            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              👁 Display
            </button>
          </>
        )}
      </div>

      {/* Fields */}
      <div className="row g-3">
        {fields.map(f => (
          <div className="col-md-4" key={f.key}>
            <label className="form-label">{f.label}</label>

            {mode === 'edit' ? (
              f.render ? (
                f.render(form[f.key], val => handleChange(f.key, val))
              ) : f.type === 'select' ? (
  <select
    className="form-select"
    value={form[f.key] ?? ''}
    onChange={e => handleChange(f.key, e.target.value)}
  >
    <option value="">-- Select --</option>
    {f.options?.map(opt => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
) : (
  <input
    type={f.type || 'text'}
    className="form-control"
    value={form[f.key] ?? ''}
    onChange={e => handleChange(f.key, e.target.value)}
  />
)
            ) : (
              <div className="form-control-plaintext">
                {form[f.key] ?? '-'}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default EntityDetailsForm