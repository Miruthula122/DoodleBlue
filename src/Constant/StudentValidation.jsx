function validateStudent(form, existingEmails = []) {
  const errors = {}
  const name = form.name?.trim() ?? ''
  const email = form.email?.trim() ?? ''
  const cgpa = form.cgpa?.trim() ?? ''
  const phone = form.phone?.trim() ?? ''

  if (!/^[A-Za-z ]{2,}$/.test(name)) {
    errors.name = 'Enter a valid name (letters only)'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email'
  } else if (existingEmails.includes(email.toLowerCase())) {
    errors.email = 'This email is already in the directory'
  }

  if (!/^[6-9]\d{9}$/.test(phone)) {
    errors.phone = 'Enter a valid 10-digit phone number'
  }

  if (!form.department) {
    errors.department = 'Please select a department'
  }

  if (!form.city) {
    errors.city = 'Please select a city'
  }

  if (!form.year) {
    errors.year = 'Please select a year'
  }

  if (!/^\d{1,2}(\.\d{1,2})?$/.test(cgpa) || Number(cgpa) > 10) {
    errors.cgpa = 'Enter a CGPA between 0 and 10'
  }

  return errors
}

export default validateStudent
