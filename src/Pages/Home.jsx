import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../CommonComponents/Header.jsx'
import Card from '../CommonComponents/Card.jsx'
import Icon from '../CommonComponents/Icon.jsx'
import Avatar from '../CommonComponents/Avatar.jsx'
import StatCard from '../CommonComponents/StatCard.jsx'
import { studentApi } from '../utils/studentApi.js'
import { teacherApi } from '../utils/teacherApi.js'
import { TOP_CGPA } from '../utils/studentData.js'
import './Home.css'

function Home() {
  // 1. State Management
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  // 2. API Integration - load both collections from db.json
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError('')

      try {
        const [studentData, teacherData] = await Promise.all([studentApi(), teacherApi()])

        setStudents(studentData)
        setTeachers(teacherData)
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : 'Unable to load the dashboard because of an unexpected error.',
        )
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [retryCount])

  // 3. Numbers shown on the page
  const averageCgpa = students.length
    ? (students.reduce((total, student) => total + student.cgpa, 0) / students.length).toFixed(1)
    : '—'

  const activeTeachers = teachers.filter((teacher) => teacher.status === 'Active').length

  const departmentCount = new Set([
    ...students.map((student) => student.department),
    ...teachers.map((teacher) => teacher.department),
  ]).size

  const topPerformers = students
    .filter((student) => student.cgpa > TOP_CGPA)
    .sort((first, second) => second.cgpa - first.cgpa)
    .slice(0, 3)

  // students per department, biggest first
  const counts = {}
  students.forEach((student) => {
    counts[student.department] = (counts[student.department] || 0) + 1
  })
  const departments = Object.entries(counts).sort((first, second) => second[1] - first[1])
  const largestDepartment = departments.length ? departments[0][1] : 1

  const show = (value) => (loading || error ? '—' : value)

  return (
    <div className="directory-page home-page">
      <Header />

      <main className="directory-content">
        {/* Hero */}
        <section className="home-hero" aria-labelledby="home-title">
          <p className="eyebrow">Welcome to Campus Directory</p>
          <h1 id="home-title">Everything about your campus, in one place.</h1>
          <p className="hero-text">
            Browse student records, keep teacher details up to date and see how every department
            is doing at a glance.
          </p>

          <div className="hero-actions">
            <Link className="cta cta-primary" to="/students">
              <Icon name="users" size={18} />
              Browse Students
            </Link>
            <Link className="cta cta-secondary" to="/teachers">
              <Icon name="cap" size={18} />
              Manage Teachers
            </Link>
          </div>
        </section>

        {error && (
          <div className="home-error" role="alert">
            <p>{error}</p>
            <button type="button" className="outline-button" onClick={() => setRetryCount((count) => count + 1)}>
              Try again
            </button>
          </div>
        )}

        {/* Numbers */}
        <section className="stat-grid" aria-label="Campus summary">
          <StatCard icon="users" label="Total Students" value={show(students.length)} />
          <StatCard
            icon="user"
            label="Total Teachers"
            value={show(teachers.length)}
            note={loading || error ? '' : `${activeTeachers} active`}
          />
          <StatCard icon="cap" label="Departments" value={show(departmentCount)} />
          <StatCard icon="star" label="Average CGPA" value={show(averageCgpa)} />
        </section>

        {/* Quick links */}
        <section className="quick-links" aria-label="Quick links">
          <Link className="quick-card" to="/students">
            <span className="stat-icon"><Icon name="users" size={22} /></span>
            <div>
              <h2>Students</h2>
              <p>Search, filter and sort records, add new students and view top performers.</p>
            </div>
            <Icon name="right" size={18} />
          </Link>

          <Link className="quick-card" to="/teachers">
            <span className="stat-icon"><Icon name="book" size={22} /></span>
            <div>
              <h2>Teachers</h2>
              <p>View, add, edit and remove teachers and track their subjects and students.</p>
            </div>
            <Icon name="right" size={18} />
          </Link>
        </section>

        {/* Highlights */}
        <div className="home-columns">
          <Card className="home-panel" aria-labelledby="top-title">
            <div className="section-head">
              <span className="head-icon plain"><Icon name="trophy" size={26} /></span>
              <div>
                <h2 id="top-title">Top Performers</h2>
                <p>Highest CGPA across the campus.</p>
              </div>
              <Link className="panel-link" to="/students">View all</Link>
            </div>

            {loading ? (
              <p className="message" role="status">Loading...</p>
            ) : topPerformers.length === 0 ? (
              <p className="message">No students have a CGPA above {TOP_CGPA} yet.</p>
            ) : (
              <ul className="top-list">
                {topPerformers.map((student, index) => (
                  <li key={student.id}>
                    <span className="rank">{index + 1}</span>
                    <Avatar name={student.name} />
                    <div>
                      <strong>{student.name}</strong>
                      <span>{student.department} <span className="dot">•</span> Year {student.year}</span>
                    </div>
                    <span className="pill">CGPA <strong>{student.cgpa.toFixed(1)}</strong></span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card className="home-panel" aria-labelledby="dept-title">
            <div className="section-head">
              <span className="head-icon plain"><Icon name="cap" size={26} /></span>
              <div>
                <h2 id="dept-title">Students by Department</h2>
                <p>How students are spread across departments.</p>
              </div>
            </div>

            {loading ? (
              <p className="message" role="status">Loading...</p>
            ) : departments.length === 0 ? (
              <p className="message">No student records yet.</p>
            ) : (
              <ul className="dept-bars">
                {departments.map(([name, count]) => (
                  <li key={name}>
                    <span className="bar-label">{name}</span>
                    <span className="bar-track">
                      <span className="bar-fill" style={{ width: `${(count / largestDepartment) * 100}%` }} />
                    </span>
                    <span className="bar-count">{count}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Home