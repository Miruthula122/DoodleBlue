import { getInitials } from '../utils/studentData.js'

function Avatar({ name, size = 'md' }) {
  return (
    <span className={`avatar avatar-${size}`} aria-hidden="true">
      {getInitials(name)}
    </span>
  )
}

export default Avatar
