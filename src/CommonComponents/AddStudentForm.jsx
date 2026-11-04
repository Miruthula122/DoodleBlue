import { useRef, useState } from 'react'
import Card from './Card.jsx'
import FormInput from './FormInput.jsx'
import DropDown from './DropDown.jsx'
import Button from './Button.jsx'
import Icon from './Icon.jsx'
import validateStudent from '../Constant/StudentValidation.jsx'
import { DEPARTMENTS, YEAR_OPTIONS, CITIES } from '../utils/studentData.js'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  department: '',
  year: '',
  cgpa: '',
  city: '',
}

const required = <span className="required">*</span>

function AddStudentForm({ existingEmails, onAdd }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const nameRef = useRef(null)
  const [saving, setSaving] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
    setMessage('')
    setSubmitError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setSubmitError('')

    const formErrors = validateStudent(form, existingEmails)
    setErrors(formErrors)
    if (Object.keys(formErrors).length > 0) {
      return
    }

    setSaving(true)
    try {
      await onAdd({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        department: form.department,
        year: Number(form.year),
        cgpa: Number(form.cgpa),
        city: form.city.trim(),
      })

      setMessage(`${form.name.trim()} was added to the directory.`)
      setForm(initialForm)
      nameRef.current.focus()
    } catch (requestError) {
      setSubmitError(requestError.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="add-card" aria-labelledby="add-title">
      <div className="add-head">
        <span className="head-icon">
          <Icon name="userPlus" size={22} />
        </span>
        <div>
          <h3 id="add-title">Add a New Student</h3>
          <p>Enter student details to add them to the directory.</p>
        </div>
      </div>

      <form className="add-form" onSubmit={handleSubmit} noValidate>
        <FormInput
          label={<>Full Name {required}</>}
          type="text"
          placeholder="Enter student name"
          icon="user"
          error={errors.name}
          register={{ id: 'name', name: 'name', value: form.name, onChange: handleChange, ref: nameRef }}
        />
        <FormInput
          label={<>Email Address {required}</>}
          type="email"
          placeholder="Enter email address"
          icon="mail"
          error={errors.email}
          register={{ id: 'email', name: 'email', value: form.email, onChange: handleChange }}
        />
        <FormInput
          label={<>Phone Number {required}</>}
          type="tel"
          placeholder="Enter phone number"
          icon="phone"
          error={errors.phone}
          register={{ id: 'phone', name: 'phone', value: form.phone, onChange: handleChange }}
        />
        <DropDown
          label={<>Department {required}</>}
          placeholder="Select department"
          icon="cap"
          options={DEPARTMENTS}
          error={errors.department}
          register={{ id: 'department', name: 'department', value: form.department, onChange: handleChange }}
        />
        <DropDown
          label={<>Year of Study {required}</>}
          placeholder="Select year"
          icon="calendar"
          options={YEAR_OPTIONS}
          error={errors.year}
          register={{ id: 'year', name: 'year', value: form.year, onChange: handleChange }}
        />
        <FormInput
          label={<>CGPA {required}</>}
          type="text"
          placeholder="Enter CGPA (e.g., 8.5)"
          icon="star"
          error={errors.cgpa}
          register={{ id: 'cgpa', name: 'cgpa', value: form.cgpa, onChange: handleChange, inputMode: 'decimal' }}
        />
        <DropDown
          label={<>City {required}</>}
          placeholder="Select city"
          icon="mapMarker"
          options={CITIES}
          error={errors.city}
          register={{ id: 'city', name: 'city', value: form.city, onChange: handleChange }}
        />

        <Button type="submit" className="add-button" disabled={saving}>
          <Icon name="plus" size={16} />
          {saving ? 'Saving...' : 'Add Student'}
        </Button>

        {submitError && <p className="error" role="alert">{submitError}</p>}

        {message && (
          <p className="form-message" role="status">
            {message}
          </p>
        )}
      </form>
    </Card>
  )
}

export default AddStudentForm
