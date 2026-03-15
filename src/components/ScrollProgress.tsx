import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onScroll() {
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed left-0 right-0 top-0 z-[100] h-1 bg-white/5">
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-cyan-400 to-purple-500"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
