import { Link } from 'react-router-dom'

export function Footer({
  copy,
}: {
  copy: string
  links: Array<{ label: string; href: string; external: boolean }>
}) {
  return (
    <footer className="border-t border-white/5 bg-[#050508] py-12">
      <div className="section-shell flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <Link
            className="mono-heading text-xl font-bold tracking-widest text-[var(--neon-blue)]"
            to="/"
          >
            MD
          </Link>
          <p className="mt-2 max-w-sm text-sm text-slate-500">
            Senior Engineer architecting high-performance digital ecosystems with purpose.
          </p>
        </div>

        <div className="md:text-right">
          <p className="mono-heading text-xs uppercase tracking-widest text-slate-400">
            Built with React, TypeScript & Tailwind
          </p>
          <p className="mt-1 text-[10px] text-slate-600">{copy}</p>
        </div>
      </div>
    </footer>
  )
}
