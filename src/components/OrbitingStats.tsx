import { accentVar } from '../data/accents'
import type { HeroStat } from '../types/content'

// Positions relative to a 700×700 orbit container.
// The outer wrapper applies scaleX(1.8) scaleY(0.6) to squash the
// circular orbit into a wide, flat ellipse. Each card's inner wrapper
// applies the inverse scale so the card content appears undistorted.
// Equilateral triangle at radius ≈295px from container center (350,350).
// All three cards trace the same elliptical orbit path, 120° apart.
const positions = [
  'top-[8%] left-[55%]',
  'top-[41%] left-[86%]',
  'top-[71%] left-[14%]',
]

interface OrbitingStatsProps {
  stats: HeroStat[]
}

export function OrbitingStats({ stats }: OrbitingStatsProps) {
  return (
    <div
      className="pointer-events-none absolute left-[57%] top-1/2 hidden lg:block"
      style={{ transform: 'translateX(-50%) translateY(-50%) scaleX(1.4) scaleY(0.88)' }}
    >
      <div className="orbit-container relative h-[900px] w-[900px]">
        {stats.map((stat, index) => (
          <div className={`orbit-item absolute ${positions[index]}`} key={stat.label}>
            <div style={{ transform: 'translateX(-50%) translateY(-50%) scaleX(0.714) scaleY(1.136)' }}>
              <div className="glass-panel pointer-events-auto flex min-w-[150px] flex-col items-center rounded-2xl p-5 opacity-70 transition-opacity hover:opacity-100">
                <span
                  className="mono-heading text-2xl font-bold"
                  style={{ color: accentVar[stat.accent] }}
                >
                  {stat.value}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {stat.label}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
