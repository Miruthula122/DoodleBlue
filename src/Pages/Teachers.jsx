import { useEffect, useState } from 'react'
import Header from '../CommonComponents/Header.jsx'
import Card from '../CommonComponents/Card.jsx'
import Icon from '../CommonComponents/Icon.jsx'
import DropDown from '../CommonComponents/DropDown.jsx'
import Button from '../CommonComponents/Button.jsx'
import TeacherRow from '../CommonComponents/TeacherRow.jsx'
import TeacherDetails from '../CommonComponents/TeacherDetails.jsx'
import TeacherFormModal from '../CommonComponents/TeacherFormModal.jsx'
import ConfirmDialog from '../CommonComponents/ConfirmDialog.jsx'
import Pagination from '../CommonComponents/Pagination.jsx'
import { teacherApi, jsonRequest } from '../utils/teacherApi.js'
import { TEACHER_DEPARTMENTS, STATUS_OPTIONS } from '../utils/teacherData.js'
import './Teachers.css'

const PAGE_SIZE = 10

function Teachers() {
  // 1. State Management
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  const [searchText, setSearchText] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [page, setPage] = useState(1)

  const [modal, setModal] = useState(null)
  const [notice, setNotice] = useState('')

  // 2. API Integration 
  useEffect(() => {
    async function fetchTeachers() {
      setLoading(true)
      setError('')

      try {
        const data = await teacherApi()

        if (!Array.isArray(data)) {
          throw new Error('The teachers API returned an unexpected response.')
        }

        setTeachers(data)
      } catch (requestError) {
        setError(requestError?.message || 'Unable to load teachers.')
      } finally {
        setLoading(false)
      }
    }

    fetchTeachers()
  }, [retryCount])

  // 3. Debounce the search box
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText)
      setPage(1)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchText])

  const searchValue = debouncedSearch.trim().toLowerCase()

  const subjects = [...new Set(teachers.map((teacher) => teacher.subject))].sort()

  let result = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchValue) ||
      teacher.email.toLowerCase().includes(searchValue),
  )

  if (selectedDepartment) {
    result = result.filter((teacher) => teacher.department === selectedDepartment)
  }

  if (selectedSubject) {
    result = result.filter((teacher) => teacher.subject === selectedSubject)
  }

  if (selectedStatus) {
    result = result.filter((teacher) => teacher.status === selectedStatus)
  }

  const totalPages = Math.max(1, Math.ceil(result.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const visibleTeachers = result.slice(startIndex, startIndex + PAGE_SIZE)

  function handleDepartmentChange(event) {
    setSelectedDepartment(event.target.value)
    setPage(1)
  }

  function handleSubjectChange(event) {
    setSelectedSubject(event.target.value)
    setPage(1)
  }

  function handleStatusChange(event) {
    setSelectedStatus(event.target.value)
    setPage(1)
  }

  function handleClearFilters() {
    setSearchText('')
    setDebouncedSearch('')
    setSelectedDepartment('')
    setSelectedSubject('')
    setSelectedStatus('')
    setPage(1)
  }

  function handleAction(type, teacher) {
    setNotice('')
    setModal({ type, teacher })
  }

  function closeModal() {
    setModal(null)
  }

  // Add (POST) or Edit (PUT)
  async function handleSave(values) {
    if (modal.type === 'edit') {
      const updated = await teacherApi(
        `/${modal.teacher.id}`,
        jsonRequest('PUT', { ...modal.teacher, ...values }),
      )

      setTeachers((current) =>
        current.map((teacher) => (teacher.id === updated.id ? updated : teacher)),
      )
      setNotice(`${updated.name} was updated.`)
    } else {
      const saved = await teacherApi('', jsonRequest('POST', values))

      setTeachers((current) => [saved, ...current])
      setNotice(`${saved.name} was added to the directory.`)
    }

    setModal(null)
  }

  // Delete (DELETE)
  async function handleDelete() {
    const { teacher } = modal

    await teacherApi(`/${teacher.id}`, { method: 'DELETE' })

    setTeachers((current) => current.filter((item) => item.id !== teacher.id))
    setNotice(`${teacher.name} was removed.`)
    setModal(null)
  }

  function handleRetry() {
    setRetryCount((count) => count + 1)
  }

  const existingEmails = teachers
    .filter((teacher) => teacher.id !== modal?.teacher?.id)
    .map((teacher) => teacher.email.toLowerCase())

  return (
    <div className="directory-page teachers-page">
      <Header />

      <main className="directory-content">
        <section className="intro" aria-labelledby="teachers-title">
          <div>
            <p className="eyebrow">Teacher Management</p>
            <h1 id="teachers-title">Manage Teachers</h1>
            <p className="intro-text">
              View, edit, and remove teacher records. Keep track of departments, subjects and
              student counts.
            </p>
          </div>

          <div className="total-card" aria-live="polite">
            <Icon name="users" size={34} />
            <div>
              <span>Total Teachers</span>
              <strong>{loading ? '—' : teachers.length}</strong>
            </div>
          </div>
        </section>

        <Card className="filter-card" aria-label="Teacher search and filters">
          <div className="input-group search-group">
            <label htmlFor="teacher-search" className="sr-only">Search teachers</label>
            <div className="field-control">
              <Icon name="search" />
              <input
                id="teacher-search"
                className="form-input"
                type="search"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search by name, email or department..."
              />
            </div>
          </div>

          <DropDown
            label="Department"
            placeholder="All Departments"
            options={TEACHER_DEPARTMENTS}
            register={{ id: 'department-filter', value: selectedDepartment, onChange: handleDepartmentChange }}
          />
          <DropDown
            label="Subject"
            placeholder="All Subjects"
            options={subjects}
            register={{ id: 'subject-filter', value: selectedSubject, onChange: handleSubjectChange }}
          />
          <DropDown
            label="Status"
            placeholder="All Status"
            options={STATUS_OPTIONS}
            register={{ id: 'status-filter', value: selectedStatus, onChange: handleStatusChange }}
          />

          <Button className="clear-button" onClick={handleClearFilters}>
            <Icon name="refresh" size={16} />
            Clear Filters
          </Button>
          <Button className="add-teacher-button" onClick={() => handleAction('add')}>
            <Icon name="plus" size={16} />
            Add Teacher
          </Button>
        </Card>

        {notice && (
          <p className="notice" role="status">
            {notice}
          </p>
        )}

        <Card className="table-card" aria-label="Teachers">
          {loading ? (
            <p className="message" role="status">Loading teachers...</p>
          ) : error ? (
            <div className="message error-message" role="alert">
              <p>{error}</p>
              <button type="button" className="outline-button" onClick={handleRetry}>
                Try again
              </button>
            </div>
          ) : result.length === 0 ? (
            <p className="message" role="status">
              No matching teachers. Try another search or clear the filters.
            </p>
          ) : (
            <>
              <div className="table-scroll">
                <table className="teacher-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Teacher Name</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Subject</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleTeachers.map((teacher, index) => (
                      <TeacherRow
                        key={teacher.id}
                        teacher={teacher}
                        number={startIndex + index + 1}
                        onAction={handleAction}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="results-footer table-footer">
                <span>
                  Showing {startIndex + 1}–{startIndex + visibleTeachers.length} of {result.length} teachers
                </span>
                <Pagination currentPage={currentPage} totalPages={totalPages} onChange={setPage} />
              </div>
            </>
          )}
        </Card>
      </main>

      {modal?.type === 'view' && <TeacherDetails teacher={modal.teacher} onClose={closeModal} />}

      {(modal?.type === 'add' || modal?.type === 'edit') && (
        <TeacherFormModal
          teacher={modal.teacher}
          existingEmails={existingEmails}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}

      {modal?.type === 'delete' && (
        <ConfirmDialog teacher={modal.teacher} onConfirm={handleDelete} onCancel={closeModal} />
      )}
    </div>
  )
}

export default Teachers