export type Question = {
  id: string
  text: string
  options: string[]
  answer: string
}

export const questions: Question[] = [
  {
    id: 'q1',
    text: 'What is the capital of France?',
    options: ['Paris', 'Lyon', 'Marseille', 'Nice'],
    answer: 'Paris',
  },
  {
    id: 'q2',
    text: 'Which language runs in a web browser?',
    options: ['Java', 'C', 'Python', 'JavaScript'],
    answer: 'JavaScript',
  },
  {
    id: 'q3',
    text: 'What does CSS stand for?',
    options: [
      'Computer Style Sheets',
      'Cascading Style Sheets',
      'Creative Style System',
      'Colorful Style Sheets',
    ],
    answer: 'Cascading Style Sheets',
  },
]
