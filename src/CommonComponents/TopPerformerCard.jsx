import Avatar from './Avatar.jsx'
import Icon from './Icon.jsx'

function TopPerformerCard({ student }) {
  return (
    <article className="performer-card">
      <Avatar name={student.name} size="lg" />

      <div className="performer-body">
        <h4>{student.name}</h4>
        <p className="performer-meta">
          {student.department} <span className="dot">•</span> Year {student.year}
        </p>

        <span className="pill">CGPA</span>
        <strong className="performer-cgpa">{student.cgpa.toFixed(1)}</strong>

        <span className="badge">
          <Icon name="star" size={12} filled />
          Top Performer
        </span>
      </div>
    </article>
  )
}

export default TopPerformerCard
