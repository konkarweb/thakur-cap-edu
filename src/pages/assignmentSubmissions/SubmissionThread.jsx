import React from 'react'
import { useEffect, useState} from 'react'
import SubmissionItemCard from './SubmissionItemCard'
import AddSubmissionItem from './AddSubmissionItem'
import { getSubmissionItems } from '../../api/students.api'
import { getAuthUser } from '../../utils/auth'

const SubmissionThread = ({ submissionId }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const authUser = getAuthUser()
const currentUserId = authUser?.user_id

  const loadItems = async () => {
    setLoading(true)
    const res = await getSubmissionItems(submissionId)
    setItems(res.data?.data || [])
    setLoading(false)
  }

  useEffect(() => {
    loadItems()
  }, [submissionId])

  return (
    <div className="submission-thread">

      <h6 className="fw-semibold mb-3">Discussion</h6>

      {loading && <div className="text-muted">Loading comments...</div>}

      {!loading && items.length === 0 && (
        <div className="alert alert-light border">
          No comments yet.
        </div>
      )}

      {items.map(item => (
        <SubmissionItemCard key={item.item_id} item={item} currentUserId={currentUserId} />
      ))}

      {/* Add new comment */}
      <AddSubmissionItem
        submissionId={submissionId}
        onSuccess={loadItems}
      />
    </div>
  )
}

export default SubmissionThread