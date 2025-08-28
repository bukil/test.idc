export type BasicQuestion = {
  id: string
  text: string
  options: string[]
  answer: string
}

export const basicQuestions: BasicQuestion[] = [
  {
    id: 'b1',
    text: 'Which of the following is a subtractive, print-oriented color model?',
    options: ['RGB', 'CMYK', 'HSL', 'LAB'],
    answer: 'CMYK',
  },
  {
    id: 'b2',
    text: 'Which model represents color as Hue, Saturation, and Lightness?',
    options: ['XYZ', 'YCbCr', 'HSL', 'HSV/HSB'],
    answer: 'HSL',
  },
  {
    id: 'b3',
    text: 'What is the standard color gamut for the web?',
    options: ['Adobe RGB', 'Display P3', 'sRGB', 'ProPhoto RGB'],
    answer: 'sRGB',
  },
  {
    id: 'b4',
    text: 'Which statement is true about Display P3 vs sRGB?',
    options: [
      'sRGB covers a wider gamut than Display P3',
      'Display P3 covers a wider gamut than sRGB',
      'They cover exactly the same gamut',
      'Display P3 is only used for printing',
    ],
    answer: 'Display P3 covers a wider gamut than sRGB',
  },
  {
    id: 'b5',
    text: 'Which RGB working space has the widest gamut among these?',
    options: ['sRGB', 'Adobe RGB', 'Display P3', 'ProPhoto RGB'],
    answer: 'ProPhoto RGB',
  },
]
