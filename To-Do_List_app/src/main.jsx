import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TaskApp from './Taskapp.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskApp />
  </StrictMode>,
)
