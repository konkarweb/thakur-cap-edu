import React from 'react'

const TableActionHandler = async (action, row) => {
  try {
    if (action.confirm) {
      const ok = window.confirm(`Are you sure to ${action.label}?`)
      if (!ok) return
    }

    const params = action.getParams
      ? action.getParams(row)
      : row

    const res = await action.api(params)

    console.log('Action success:', res)

    if (action.onSuccess) {
      action.onSuccess(res, row)
    }

  } catch (err) {
    console.error('Action failed', err)
  }
}

export default TableActionHandler