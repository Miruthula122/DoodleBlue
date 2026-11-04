export const TEACHER_DEPARTMENTS = [
  'Computer Science',
  'Mathematics',
  'Information Technology',
  'Economics',
  'Mechanical Engineering',
  'Physics',
  'Chemistry',
  'Biology',
]

export const STATUS_OPTIONS = ['Active', 'Inactive']

export function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}