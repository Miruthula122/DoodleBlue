
export const DEPARTMENTS = [
  'Computer Science',
  'Mechanical Engineering',
  'Information Technology',
  'Business Administration',
  'Economics',
  'Electrical Engineering',
  'Civil Engineering',
  'Biotechnology',
]

export const CITIES = [
  'Mumbai',
  'Pune',
  'Delhi',
  'Bengaluru',
  'Hyderabad',
  'Chennai'
]

export const YEAR_OPTIONS = [
  { value: '1', label: 'Year 1' },
  { value: '2', label: 'Year 2' },
  { value: '3', label: 'Year 3' },
  { value: '4', label: 'Year 4' },
]

export const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'cgpa-desc', label: 'CGPA: High to Low' },
  { value: 'cgpa-asc', label: 'CGPA: Low to High' },
  { value: 'email-asc', label: 'Email: A to Z' },
  { value: 'email-desc', label: 'Email: Z to A' },
]

export const sorters = {
  'name-asc': (a, b) => a.name.localeCompare(b.name),
  'name-desc': (a, b) => b.name.localeCompare(a.name),
  'cgpa-desc': (a, b) => b.cgpa - a.cgpa,
  'cgpa-asc': (a, b) => a.cgpa - b.cgpa,
  'email-asc': (a, b) => a.email.localeCompare(b.email),
  'email-desc': (a, b) => b.email.localeCompare(a.email),
}

export const TOP_CGPA = 8.5

export function toStudent(user) {
  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    phone: user.phone,
    city: user.address.city,
    department: DEPARTMENTS[(user.id * 3) % DEPARTMENTS.length],
    year: (user.id % 4) + 1,
    cgpa: Number((6 + ((user.id * 37) % 32) / 10).toFixed(1)),
  }
}

export function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
}
