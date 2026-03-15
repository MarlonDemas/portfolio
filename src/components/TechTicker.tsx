import { useEffect, useRef } from 'react'

const tickerAccents = [
  'var(--neon-blue)',
  'var(--neon-cyan)',
  'var(--neon-purple)',
  'var(--neon-green)',
]

const tickerGlows = ['var(--neon-blue)', 'var(--neon-cyan)', 'var(--neon-purple)', 'var(--neon-green)']

interface TechTickerProps {
  items: string[]
}

export function TechTicker({ items }: TechTickerProps) {
  const doubled = [...items, ...items]
  const containerRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const marquee = marqueeRef.current
    if (!container || !marquee) return

    const groups = Array.from(marquee.querySelectorAll<HTMLElement>('.ticker-group'))

    let animId: number
    const tick = () => {
      const containerRect = container.getBoundingClientRect()
      const centerX = containerRect.left + containerRect.width / 2
      const spotlightRadius = containerRect.width * 0.22

      // Batch reads first to avoid layout thrashing
      const rects = groups.map(g => g.getBoundingClientRect())
      // Then batch writes
      rects.forEach((rect, i) => {
        const distance = Math.abs(rect.left + rect.width / 2 - centerX)
        groups[i].classList.toggle('ticker-group--lit', distance < spotlightRadius)
      })

      animId = requestAnimationFrame(tick)
    }
    animId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div
      ref={containerRef}
      className="ticker-container overflow-hidden border-y border-white/[0.10] py-4"
      style={{
        background: 'linear-gradient(to bottom, var(--surface-2), var(--surface-3))',
        boxShadow: 'inset 0 16px 32px -16px rgba(0,0,0,0.8), inset 0 -16px 32px -16px rgba(0,0,0,0.8)',
      }}
    >
      <div ref={marqueeRef} className="animate-marquee">
        {doubled.map((item, index) => {
          const color = tickerAccents[index % tickerAccents.length]
          const glow = tickerGlows[index % tickerGlows.length]
          return (
            <div className="ticker-group" key={`${item}-${index}`}>
              <span className="ticker-sep" aria-hidden="true">✦</span>
              <span className="ticker-inner">
                <span
                  className="ticker-dot"
                  style={{ backgroundColor: glow, boxShadow: `0 0 8px ${glow}` }}
                />
                <span className="ticker-label" style={{ color }}>
                  {item}
                </span>
              </span>
            </div>
          )
        })}
      </div>

      {/* Dark vignette — edges absorb into darkness */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(to right, var(--surface-1) 0%, rgba(10,10,15,0.92) 10%, rgba(10,10,15,0) 26%, rgba(10,10,15,0) 74%, rgba(10,10,15,0.92) 90%, var(--surface-1) 100%)',
        }}
      />
      {/* Spotlight beam — cyan radial glow at center */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(ellipse 42% 100% at 50% 50%, rgba(0,212,255,0.08) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
