import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import StudentDirectory from './Pages/StudentDirectory.jsx'
import Teachers from './Pages/Teachers.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/students" element={<StudentDirectory />} />
      <Route path="/teachers" element={<Teachers />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App