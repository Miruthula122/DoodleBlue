import { useEffect, useState } from 'react'
import Header from '../CommonComponents/Header.jsx'
import Card from '../CommonComponents/Card.jsx'
import Icon from '../CommonComponents/Icon.jsx'
import DropDown from '../CommonComponents/DropDown.jsx'
import Button from '../CommonComponents/Button.jsx'
import TopPerformerCard from '../CommonComponents/TopPerformerCard.jsx'
import StudentCard from '../CommonComponents/StudentCard.jsx'
import AddStudentForm from '../CommonComponents/AddStudentForm.jsx'
import StudentDetails from '../CommonComponents/StudentDetails.jsx'
import Pagination from '../CommonComponents/Pagination.jsx'
import {
  DEPARTMENTS,
  YEAR_OPTIONS,
  SORT_OPTIONS,
  TOP_CGPA,
  sorters,
} from '../utils/studentData.js'
import './StudentDirectory.css'
import { studentApi, jsonRequest } from '../utils/studentApi.js'

const PAGE_SIZE = 9

function StudentDirectory() {
  // 1. State Management
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  const [searchText, setSearchText] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [sortOrder, setSortOrder] = useState('name-asc')

  const [page, setPage] = useState(1)
  const [selectedStudent, setSelectedStudent] = useState(null)

  // 2. API Integration
  useEffect(() => {
    async function fetchStudents() {
      setLoading(true)
      setError('')

      try {
        const data = await studentApi()
        if (!Array.isArray(data)) {
          throw new Error('The students API returned an unexpected response.')
        }

        setStudents((current) => [...current.filter((student) => student.isNew), ...data])
      } catch (requestError) {
        setError(requestError?.message || 'Unable to load students.')
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [retryCount])

  // 3. Debounce the search box
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText)
      setPage(1)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchText])

  // 4. Top performers (CGPA > 8)
  const topPerformers = students
    .filter((student) => student.cgpa > TOP_CGPA)
    .sort((first, second) => second.cgpa - first.cgpa)
    .slice(0, 5)

  // 5. Searching, filtering and sorting
  const searchValue = debouncedSearch.trim().toLowerCase()

  let result = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchValue) ||
      student.email.toLowerCase().includes(searchValue),
  )

  if (selectedDepartment) {
    result = result.filter((student) => student.department === selectedDepartment)
  }

  if (selectedYear) {
    result = result.filter((student) => String(student.year) === selectedYear)
  }

  if (selectedCity) {
    result = result.filter((student) => student.city === selectedCity)
  }

  result = [...result].sort(sorters[sortOrder])

  const totalPages = Math.max(1, Math.ceil(result.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const visibleStudents = result.slice(startIndex, startIndex + PAGE_SIZE)

  function handleDepartmentChange(event) {
    setSelectedDepartment(event.target.value)
    setPage(1)
  }

  function handleYearChange(event) {
    setSelectedYear(event.target.value)
    setPage(1)
  }

  function handleSortChange(event) {
    setSortOrder(event.target.value)
    setPage(1)
  }

  function handleClearFilters() {
    setSearchText('')
    setDebouncedSearch('')
    setSelectedDepartment('')
    setSelectedYear('')
    setSelectedCity('')
    setSortOrder('name-asc')
    setPage(1)
  }

  async function handleAddStudent(newStudent) {
    const saved = await studentApi('', jsonRequest('POST', {
      ...newStudent,
    }))

    setStudents((current) => [saved, ...current])
  }

  function handleRetry() {
    setRetryCount((count) => count + 1)
  }

  const existingEmails = students.map((student) => student.email.toLowerCase())

  return (
    <div className="directory-page">
      <Header />

      <main className="directory-content" id="students">
        <section className="intro" aria-labelledby="directory-title">
          <div>
            <p className="eyebrow">Student Directory</p>
            <h1 id="directory-title">Find, manage and know your students.</h1>
            <p className="intro-text">
              Search, filter, sort and add student records. View top performers and explore the
              complete directory.
            </p>
          </div>

          <div className="total-card" aria-live="polite">
            <Icon name="users" size={34} />
            <div>
              <span>Total Students</span>
              <strong>{loading ? '—' : students.length}</strong>
            </div>
          </div>
        </section>

        <Card className="performers" aria-labelledby="performers-title">
          <div className="section-head">
            <span className="head-icon plain">
              <Icon name="trophy" size={28} />
            </span>
            <div>
              <h2 id="performers-title">Top Performers (CGPA &gt; {TOP_CGPA})</h2>
              <p>Students with CGPA greater than {TOP_CGPA} are featured here.</p>
            </div>
            <span className="count-pill">{topPerformers.length} Students</span>
          </div>

          {loading ? (
            <p className="message" role="status">Loading top performers...</p>
          ) : topPerformers.length === 0 ? (
            <p className="message" role="status">No students have a CGPA above {TOP_CGPA} yet.</p>
          ) : (
            <div className="performer-grid">
              {topPerformers.map((student) => (
                <TopPerformerCard key={student.id} student={student} />
              ))}
            </div>
          )}
        </Card>

        {/* Add form + All students */}
        <div className="workspace">
          <AddStudentForm existingEmails={existingEmails} onAdd={handleAddStudent} />

          <Card className="all-students" aria-labelledby="all-title">
            <div className="section-head">
              <span className="head-icon plain">
                <Icon name="users" size={24} />
              </span>
              <div>
                <h2 id="all-title">All Students</h2>
                <p>Search, filter and sort student records.</p>
              </div>
              {!loading && !error && (
                <span className="count-pill" aria-live="polite">
                  {result.length} {result.length === 1 ? 'Student' : 'Students'}
                </span>
              )}
            </div>

            <div className="controls" aria-label="Student search and filters">
              <div className="input-group search-group">
                <label htmlFor="student-search" className="sr-only">Search students</label>
                <div className="field-control">
                  <Icon name="search" />
                  <input
                    id="student-search"
                    className="form-input"
                    type="search"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                    placeholder="Search by name or email..."
                  />
                </div>
              </div>

              <DropDown
                label="Department"
                placeholder="All Departments"
                options={DEPARTMENTS}
                register={{ id: 'department-filter', value: selectedDepartment, onChange: handleDepartmentChange }}
              />
              <DropDown
                label="Year"
                placeholder="All Years"
                options={YEAR_OPTIONS}
                register={{ id: 'year-filter', value: selectedYear, onChange: handleYearChange }}
              />
              <DropDown
                label="Sort by"
                placeholder={null}
                options={SORT_OPTIONS}
                register={{ id: 'student-sort', value: sortOrder, onChange: handleSortChange }}
              />

              <Button className="clear-button" onClick={handleClearFilters}>
                <Icon name="refresh" size={16} />
                Clear Filters
              </Button>
            </div>

            {loading ? (
              <p className="message" role="status">Loading students...</p>
            ) : error ? (
              <div className="message error-message" role="alert">
                <p>{error}</p>
                <button type="button" className="outline-button" onClick={handleRetry}>
                  Try again
                </button>
              </div>
            ) : result.length === 0 ? (
              <p className="message" role="status">
                No matching students. Try another search or clear the filters.
              </p>
            ) : (
              <>
                <div className="student-grid">
                  {visibleStudents.map((student) => (
                    <StudentCard key={student.id} student={student} onView={setSelectedStudent} />
                  ))}
                </div>

                <div className="results-footer">
                  <span>
                    Showing {startIndex + 1}-{startIndex + visibleStudents.length} of {result.length} students
                  </span>
                  <Pagination currentPage={currentPage} totalPages={totalPages} onChange={setPage} />
                </div>
              </>
            )}
          </Card>
        </div>
      </main>

      {selectedStudent && (
        <StudentDetails student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}
    </div>
  )
}

export default StudentDirectory
