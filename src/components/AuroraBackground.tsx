export function AuroraBackground() {
  return (
    <div className="aurora-bg">
      <div className="aurora-noise" />
      <div className="aurora-blob bg-[var(--neon-blue)] left-[-10%] top-[-10%]" />
      <div
        className="aurora-blob bg-[var(--neon-purple)] bottom-[-10%] right-[-10%]"
        style={{ animationDelay: '-5s', animationDuration: '28s' }}
      />
      <div
        className="aurora-blob bg-[var(--neon-purple)] right-[5%] top-[15%]"
        style={{ animationDelay: '-12s', animationDuration: '20s', width: '38vw', height: '38vw' }}
      />
      <div
        className="aurora-blob bg-[var(--neon-green)] bottom-[-15%] left-[8%]"
        style={{ animationDelay: '-8s', animationDuration: '32s', width: '42vw', height: '42vw' }}
      />
    </div>
  )
}
