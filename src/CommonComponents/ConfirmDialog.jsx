import { useEffect, useState } from 'react'
import Card from './Card.jsx'
import Button from './Button.jsx'

function ConfirmDialog({ teacher, onConfirm, onCancel }) {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onCancel()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onCancel])

  async function handleDelete() {
    setDeleting(true)
    setError('')

    try {
      await onConfirm()
    } catch (requestError) {
      setError(requestError.message)
      setDeleting(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <Card
        className="modal-card confirm-card"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id="confirm-title" className="form-modal-title">Delete teacher?</h3>
        <p className="confirm-text">
          <strong>{teacher.name}</strong> will be removed from the directory. This cannot be undone.
        </p>

        {error && <p className="error" role="alert">{error}</p>}

        <div className="form-actions">
          <Button type="button" className="outline-button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" className="danger-button" onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default ConfirmDialog