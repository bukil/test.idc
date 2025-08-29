export type Round2Question = {
  id: string
  names: string[] // acceptable names (lowercase)
  hex: string // swatch color
}

export const round2Questions: Round2Question[] = [
  { id: 'r2q1', names: ['cerulean', 'cerulean blue'], hex: '#2a52be' },
  { id: 'r2q2', names: ['vermilion', 'vermillion'], hex: '#e34234' },
  { id: 'r2q3', names: ['periwinkle'], hex: '#ccccff' },
  { id: 'r2q4', names: ['chartreuse', 'greenish yellow', 'green-yellow', 'yellow-green', 'greenish yello'], hex: '#7fff00' },
  { id: 'r2q5', names: ['eggshell', 'eggshell white', 'off white', 'wash white'], hex: '#f0ead6' },
]
