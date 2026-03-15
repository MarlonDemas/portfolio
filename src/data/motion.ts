export const motionTokens = {
  durations: {
    fast: 0.24,
    base: 0.38,
    reveal: 0.54,
    slow: 0.72,
  },
  delays: {
    short: 0.08,
    medium: 0.14,
    long: 0.2,
  },
  easing: {
    out: [0.22, 1, 0.36, 1] as const,
    smooth: [0.16, 1, 0.3, 1] as const,
    inOut: [0.65, 0, 0.35, 1] as const,
  },
  viewport: {
    once: true,
    amount: 0.28,
  },
}
