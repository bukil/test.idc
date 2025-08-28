export type Question = {
  id: string
  text: string
  // Each option is a color hex string like #aabbcc
  options: string[]
  // The correct answer is the odd color's hex
  answer: string
}

// Helpers to generate subtle color differences
function hslToHex(h: number, s: number, l: number): string {
  // h[0..360], s/l in [0..100]
  s /= 100
  l /= 100
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r = 0, g = 0, b = 0
  if (0 <= h && h < 60) [r, g, b] = [c, x, 0]
  else if (60 <= h && h < 120) [r, g, b] = [x, c, 0]
  else if (120 <= h && h < 180) [r, g, b] = [0, c, x]
  else if (180 <= h && h < 240) [r, g, b] = [0, x, c]
  else if (240 <= h && h < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]
  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

function genColorPair(): { base: string; variant: string } {
  // Pick a base color in HSL with decent saturation/lightness for visibility
  const h = rand(0, 359)
  const s = rand(45, 80)
  const l = rand(35, 65)
  const base = hslToHex(h, s, l)

  // Subtle delta: change one component slightly
  const choice = rand(0, 2) // 0=h,1=s,2=l
  const sign = Math.random() < 0.5 ? -1 : 1
  const hDelta = 2
  const slDelta = 2
  let h2 = h, s2 = s, l2 = l
  if (choice === 0) h2 = (h + sign * hDelta + 360) % 360
  if (choice === 1) s2 = clamp(s + sign * slDelta, 40, 90)
  if (choice === 2) l2 = clamp(l + sign * slDelta, 30, 70)
  const variant = hslToHex(h2, s2, l2)
  return { base, variant }
}

function genQuestion(i: number): Question {
  const { base, variant } = genColorPair()
  const oddIndex = rand(0, 3)
  const options = Array(4).fill(base) as string[]
  options[oddIndex] = variant
  return {
    id: `q${i}`,
    text: 'Pick the odd color',
    options,
    answer: variant,
  }
}

export const questions: Question[] = Array.from({ length: 20 }, (_, i) => genQuestion(i + 1))
