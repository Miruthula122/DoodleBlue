function validateTeacher(form, existingEmails = []) {
  const errors = {}
  const name = form.name?.trim() ?? ''
  const email = form.email?.trim() ?? ''
  const subject = form.subject?.trim() ?? ''
  const students = form.students?.trim() ?? ''

  if (!/^[A-Za-z .]{2,}$/.test(name)) {
    errors.name = 'Enter a valid name (letters only)'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email'
  } else if (existingEmails.includes(email.toLowerCase())) {
    errors.email = 'This email is already used by another teacher'
  }

  if (!form.department) {
    errors.department = 'Please select a department'
  }

  if (subject.length < 2) {
    errors.subject = 'Enter the subject this teacher teaches'
  }

  if (!form.year) {
    errors.year = 'Please select a year'
  }

  if (!/^\d{1,3}$/.test(students)) {
    errors.students = 'Enter a number from 0 to 999'
  }

  if (!form.status) {
    errors.status = 'Please select a status'
  }

  return errors
}

export default validateTeacher