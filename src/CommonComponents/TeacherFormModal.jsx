import { useEffect, useRef, useState } from 'react'
import Card from './Card.jsx'
import FormInput from './FormInput.jsx'
import DropDown from './DropDown.jsx'
import Button from './Button.jsx'
import Icon from './Icon.jsx'
import validateTeacher from '../Constant/TeacherValidation.jsx'
import { YEAR_OPTIONS } from '../utils/studentData.js'
import { TEACHER_DEPARTMENTS, STATUS_OPTIONS } from '../utils/teacherData.js'

const emptyForm = {
  name: '',
  email: '',
  department: '',
  subject: '',
  year: '',
  students: '',
  status: 'Active',
}

const required = <span className="required">*</span>

function TeacherFormModal({ teacher, existingEmails, onSave, onClose }) {
  const isEdit = Boolean(teacher)

  const [form, setForm] = useState(
    isEdit
      ? {
        name: teacher.name,
        email: teacher.email,
        department: teacher.department,
        subject: teacher.subject,
        year: String(teacher.year),
        students: String(teacher.students),
        status: teacher.status,
      }
      : emptyForm,
  )
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const nameRef = useRef(null)

  useEffect(() => {
    nameRef.current.focus()
  }, [])

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  function handleChange(event) {
    const { name, value } = event.target

    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
    setSubmitError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitError('')

    const formErrors = validateTeacher(form, existingEmails)
    setErrors(formErrors)
    if (Object.keys(formErrors).length > 0) {
      return
    }

    setSaving(true)
    try {
      await onSave({
        name: form.name.trim(),
        email: form.email.trim(),
        department: form.department,
        subject: form.subject.trim(),
        year: Number(form.year),
        students: Number(form.students),
        status: form.status,
      })
    } catch (requestError) {
      setSubmitError(requestError.message)
      setSaving(false)
    }
  }

  return (
    <div className="modal-backdrop">
      <Card
        className="modal-card form-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="teacher-form-title"
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close form">
          <Icon name="close" size={16} />
        </button>

        <h3 id="teacher-form-title" className="form-modal-title">
          {isEdit ? 'Edit Teacher' : 'Add a New Teacher'}
        </h3>

        <form className="teacher-form" onSubmit={handleSubmit} noValidate>
          <FormInput
            label={<>Full Name {required}</>}
            type="text"
            placeholder="Enter teacher name"
            icon="user"
            error={errors.name}
            register={{ id: 'teacher-name', name: 'name', value: form.name, onChange: handleChange, ref: nameRef }}
          />
          <FormInput
            label={<>Email Address {required}</>}
            type="email"
            placeholder="name@example.edu"
            icon="mail"
            error={errors.email}
            register={{ id: 'teacher-email', name: 'email', value: form.email, onChange: handleChange }}
          />
          <DropDown
            label={<>Department {required}</>}
            placeholder="Select department"
            icon="cap"
            options={TEACHER_DEPARTMENTS}
            error={errors.department}
            register={{ id: 'teacher-department', name: 'department', value: form.department, onChange: handleChange }}
          />
          <FormInput
            label={<>Subject {required}</>}
            type="text"
            placeholder="e.g. Data Structures"
            icon="book"
            error={errors.subject}
            register={{ id: 'teacher-subject', name: 'subject', value: form.subject, onChange: handleChange }}
          />
          <DropDown
            label={<>Year of Study {required}</>}
            placeholder="Select year"
            icon="calendar"
            options={YEAR_OPTIONS}
            error={errors.year}
            register={{ id: 'teacher-year', name: 'year', value: form.year, onChange: handleChange }}
          />
          <FormInput
            label={<>Students {required}</>}
            type="text"
            placeholder="Number of students"
            icon="users"
            error={errors.students}
            register={{ id: 'teacher-students', name: 'students', value: form.students, onChange: handleChange, inputMode: 'numeric' }}
          />
          <DropDown
            label={<>Status {required}</>}
            placeholder={null}
            options={STATUS_OPTIONS}
            error={errors.status}
            register={{ id: 'teacher-status', name: 'status', value: form.status, onChange: handleChange }}
          />

          {submitError && (
            <p className="error form-wide" role="alert">
              {submitError}
            </p>
          )}

          <div className="form-actions form-wide">
            <button type="button" className="outline-button" onClick={onClose}>
              Cancel
            </button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Teacher'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default TeacherFormModal