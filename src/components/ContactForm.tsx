import { useState } from 'react'
import type { FormEvent } from 'react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqeyldqw'

type Status = 'idle' | 'sending' | 'success' | 'error'

const ENQUIRY_TYPES = ['Job Opportunity', 'Project / Freelance', 'Other'] as const

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="glass-panel w-full max-w-[520px] rounded-[24px] p-10 text-center">
        <div className="mb-4 text-4xl">✓</div>
        <h3 className="mono-heading mb-3 text-xl font-bold text-white">Message sent!</h3>
        <p className="text-slate-300">I'll get back to you within a couple of days.</p>
      </div>
    )
  }

  return (
    <form
      className="glass-panel w-full max-w-[520px] space-y-5 rounded-[24px] p-8"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="mono-heading text-[10px] font-bold uppercase tracking-widest text-slate-300" htmlFor="name">
            Name
          </label>
          <input
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-colors focus:border-[var(--neon-blue)] focus:bg-white/8"
            id="name"
            name="name"
            placeholder="Your name"
            required
            type="text"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="mono-heading text-[10px] font-bold uppercase tracking-widest text-slate-300" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-colors focus:border-[var(--neon-blue)] focus:bg-white/8"
            id="email"
            name="email"
            placeholder="you@example.com"
            required
            type="email"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="mono-heading text-[10px] font-bold uppercase tracking-widest text-slate-300" htmlFor="enquiry">
          Enquiry type
        </label>
        <select
          className="rounded-xl border border-white/10 bg-[#0a0a0f] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[var(--neon-blue)]"
          id="enquiry"
          name="enquiry"
        >
          {ENQUIRY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="mono-heading text-[10px] font-bold uppercase tracking-widest text-slate-300" htmlFor="message">
          Message
        </label>
        <textarea
          className="min-h-[120px] resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-relaxed text-white placeholder-slate-600 outline-none transition-colors focus:border-[var(--neon-blue)] focus:bg-white/8"
          id="message"
          name="message"
          placeholder="What's on your mind?"
          required
          rows={4}
        />
      </div>

      {status === 'error' && (
        <p className="text-xs text-red-400">
          Something went wrong — try again or{' '}
          <a className="underline hover:text-red-300" href="mailto:hello@marlondemas.dev">
            email directly
          </a>
          .
        </p>
      )}

      <button
        className="button-primary mono-heading w-full justify-center py-4 text-sm font-bold tracking-widest disabled:cursor-not-allowed disabled:opacity-50"
        disabled={status === 'sending'}
        type="submit"
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
