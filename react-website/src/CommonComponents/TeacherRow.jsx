import Avatar from './Avatar.jsx'
import Icon from './Icon.jsx'
import { slugify } from '../utils/teacherData.js'

function TeacherRow({ teacher, number, onAction }) {
  return (
    <tr>
      <td className="col-number">{number}</td>

      <td>
        <div className="teacher-cell">
          <Avatar name={teacher.name} />
          <div>
            <strong>{teacher.name}</strong>
            <span>{teacher.email}</span>
          </div>
        </div>
      </td>

      <td className="col-email">{teacher.email}</td>

      <td>
        <span className={`dept-pill dept-${slugify(teacher.department)}`}>
          {teacher.department}
        </span>
      </td>

      <td>{teacher.subject}</td>

      <td>
        <div className="row-actions">
          <button type="button" className="action-btn" onClick={() => onAction('view', teacher)}>
            <Icon name="eye" size={14} /> View
          </button>
          <button type="button" className="action-btn" onClick={() => onAction('edit', teacher)}>
            <Icon name="edit" size={14} /> Edit
          </button>
          <button
            type="button"
            className="action-btn danger"
            onClick={() => onAction('delete', teacher)}
          >
            <Icon name="trash" size={14} /> Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

export default TeacherRow