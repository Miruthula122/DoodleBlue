import Icon from './Icon.jsx'

function StatCard({ icon, label, value, note }) {
  return (
    <article className="stat-card">
      <span className="stat-icon">
        <Icon name={icon} size={22} />
      </span>
      <div>
        <span className="stat-label">{label}</span>
        <strong className="stat-value">{value}</strong>
        {note && <span className="stat-note">{note}</span>}
      </div>
    </article>
  )
}

export default StatCard
