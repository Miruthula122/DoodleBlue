import { useEffect, useRef } from 'react'
import Avatar from './Avatar.jsx'
import Card from './Card.jsx'
import Icon from './Icon.jsx'
import { TOP_CGPA } from '../utils/studentData.js'

function StudentDetails({ student, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const rows = [
    { icon: 'mail', label: 'Email', value: student.email },
    { icon: 'phone', label: 'Phone', value: student.phone },
    { icon: 'cap', label: 'Department', value: student.department },
    { icon: 'calendar', label: 'Year of study', value: `Year ${student.year}` },
    { icon: 'pin', label: 'City', value: student.city },
  ]

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <Card
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="details-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close details"
        >
          <Icon name="close" size={16} />
        </button>

        <div className="modal-head">
          <Avatar name={student.name} size="lg" />
          <div>
            <h3 id="details-title">{student.name}</h3>
            <span className="pill">
              CGPA <strong>{student.cgpa.toFixed(1)}</strong>
            </span>
            {student.cgpa > TOP_CGPA && (
              <span className="badge">
                <Icon name="star" size={12} filled />
                Top Performer
              </span>
            )}
          </div>
        </div>

        <dl className="modal-list">
          {rows.map((row) => (
            <div key={row.label} className="modal-row">
              <Icon name={row.icon} size={16} />
              <dt>{row.label}</dt>
              <dd>{row.value || '—'}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </div>
  )
}

export default StudentDetails
