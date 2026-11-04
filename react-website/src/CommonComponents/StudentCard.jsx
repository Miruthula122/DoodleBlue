import Avatar from './Avatar.jsx'

function StudentCard({ student, onView }) {
  return (
    <article className="student-card">
      <Avatar name={student.name} />

      <div className="student-info">
        <h4>{student.name}</h4>
        <a className="student-email" href={`mailto:${student.email}`}>
          {student.email}
        </a>
        <p className="student-meta">
          {student.department} <span className="dot">•</span> Year {student.year}
        </p>
      </div>

      <div className="student-footer">
        <span className="pill">
          CGPA <strong>{student.cgpa.toFixed(1)}</strong>
        </span>
        <button className="outline-button" type="button" onClick={() => onView(student)}>
          View Details
        </button>
      </div>
    </article>
  )
}

export default StudentCard
