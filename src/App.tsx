import { useEffect } from 'react'
import { MotionConfig } from 'motion/react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AuroraBackground } from './components/AuroraBackground'
import { GrainOverlay } from './components/GrainOverlay'
import { ScrollProgress } from './components/ScrollProgress'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'

function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    const scrollToTarget = () => {
      if (location.hash) {
        const id = location.hash.slice(1)
        const element = document.getElementById(id)

        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
      }

      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const timer = window.setTimeout(scrollToTarget, 40)
    return () => window.clearTimeout(timer)
  }, [location.hash, location.pathname])

  return null
}

function NotFound() {
  return (
    <div className="page-shell flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mono-heading mb-4 text-6xl font-bold text-white">404</h1>
        <p className="mb-8 text-slate-300">Page not found.</p>
        <a className="text-sm font-semibold text-[var(--neon-cyan)] hover:text-white" href="/">
          ← Back to home
        </a>
      </div>
    </div>
  )
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <GrainOverlay />
      <AuroraBackground />
      <ScrollProgress />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </MotionConfig>
  )
}
