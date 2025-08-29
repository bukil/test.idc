import React, { createContext, useContext, useMemo, useState } from 'react'
import { questions as defaultQuestions, Question } from '../data/questions'

type Answers = Record<number, string>

type QuizContextType = {
  questions: Question[]
  answers: Answers
  recordAnswer: (index: number, value: string) => void
  reset: () => void
  score: () => number
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<Answers>({})
  const [questions] = useState<Question[]>(defaultQuestions)

  const recordAnswer = (index: number, value: string) =>
    setAnswers((prev) => ({ ...prev, [index]: value }))

  const reset = () => setAnswers({})

  const score = () =>
    questions.reduce((acc, q, i) => (answers[i] === q.answer ? acc + 1 : acc), 0)

  const value = useMemo(
    () => ({ questions, answers, recordAnswer, reset, score }),
    [questions, answers],
  )

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

export function useQuiz() {
  const ctx = useContext(QuizContext)
  if (!ctx) throw new Error('useQuiz must be used within QuizProvider')
  return ctx
}
