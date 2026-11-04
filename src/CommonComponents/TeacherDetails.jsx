import { useEffect, useRef } from 'react'
import Avatar from './Avatar.jsx'
import Card from './Card.jsx'
import Icon from './Icon.jsx'

function TeacherDetails({ teacher, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current.focus()
  }, [])

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const rows = [
    { icon: 'mail', label: 'Email', value: teacher.email },
    { icon: 'cap', label: 'Department', value: teacher.department },
    { icon: 'book', label: 'Subject', value: teacher.subject },
    { icon: 'calendar', label: 'Year of study', value: `Year ${teacher.year}` },
    { icon: 'users', label: 'Students', value: teacher.students },
  ]

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <Card
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="teacher-details-title"
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
          <Avatar name={teacher.name} size="lg" />
          <div>
            <h3 id="teacher-details-title">{teacher.name}</h3>
            <span className={`status-pill status-${teacher.status.toLowerCase()}`}>
              {teacher.status}
            </span>
          </div>
        </div>

        <dl className="modal-list">
          {rows.map((row) => (
            <div key={row.label} className="modal-row">
              <Icon name={row.icon} size={16} />
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </div>
  )
}

export default TeacherDetails