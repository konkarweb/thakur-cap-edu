import React, { useEffect, useState } from 'react'

const EntityDetailsForm = ({
  fields = [],
  data = {},
  onSave,
  loading = false,
  mode: initialMode = "view"
}) => {

  const [mode, setMode] = useState(initialMode)
  const [form, setForm] = useState({})
  const [original, setOriginal] = useState({})

  // Sync data → form
  useEffect(() => {

  const formData = { ...(data || {}) }

  fields.forEach(field => {

    if (
      (formData[field.key] === undefined ||
       formData[field.key] === null ||
       formData[field.key] === '') &&
      field.defaultValue !== undefined
    ) {
      formData[field.key] = field.defaultValue
    }

  })

  setForm(formData)
  setOriginal(formData)

}, [data, fields])

  // Sync mode
  useEffect(() => {
    setMode(initialMode)
  }, [initialMode])

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    try {
      // 🔥 Build FormData
      const formData = new FormData()

      Object.keys(form).forEach(key => {
        console.log(`Processing field ${key}:`, form[key])
        formData.append(key, form[key] ?? '')
      })

      console.log('Saving form data:', formData)
      const res = await onSave(form)

      if (res !== false) {
        setOriginal(form)
        setMode("view")
      }

    } catch (err) {
      console.error("Save failed", err)
    }
  }

  const handleCancel = () => {
    setForm(original)
    setMode("view")
  }

  // 🔥 FIXED dirty check
  const isDirty = Object.keys(form).some(
    key => String(form[key] ?? '') !== String(original[key] ?? '')
  )

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
          <div className={f.col || "col-md-4"} key={f.key}>

            <label className="form-label">{f.label}</label>

            {mode === 'edit' ? (

              // 🔥 Custom render (like ReactQuill etc.)
              f.render ? (
                f.render(form[f.key], val => handleChange(f.key, val))
              )

              // 🔥 SELECT FIX (convert to number if needed)
              : f.type === 'select' ? (
                <select
                  className="form-select"
                  value={form[f.key] ?? ''}
                  onChange={e =>
                    handleChange(
                      f.key,
                      isNaN(e.target.value)
                        ? e.target.value
                        : Number(e.target.value)
                    )
                  }
                >
                  <option value="">-- Select --</option>

                  {f.options?.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )

              // TEXTAREA
              : f.type === 'textarea' ? (
                <textarea
                  className="form-control"
                  rows={f.rows || 3}
                  value={form[f.key] ?? ''}
                  onChange={e => handleChange(f.key, e.target.value)}
                />
              )

              // INPUT
              : (
                <input
                  type={f.type || 'text'}
                  className="form-control"
                  value={form[f.key] ?? ''}
                  onChange={e => handleChange(f.key, e.target.value)}
                />
              )

            ) : (

              // VIEW MODE
              <div className="form-control-plaintext">
                {f.render
                  ? f.render(form[f.key], () => {})
                  : form[f.key] ?? '-'}
              </div>

            )}

          </div>
        ))}

      </div>
    </>
  )
}

export default EntityDetailsForm