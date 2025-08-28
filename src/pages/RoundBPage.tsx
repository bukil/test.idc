import { useState, useMemo, useEffect } from 'react'
import { Button, Card, CardContent, Typography, Stack, LinearProgress, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { basicQuestions } from '../data/basicQuestions'
import { useQuiz } from '../context/QuizContext'

export default function RoundBPage() {
  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState<string | null>(null)
  const nav = useNavigate()
  const { recordAnswer, answers } = useQuiz()

  const q = useMemo(() => basicQuestions[index], [index])
  const progress = Math.round((index / basicQuestions.length) * 100)

  // Warn on browser refresh if there is progress
  useEffect(() => {
    const hasProgress = Object.keys(answers).length > 0
    if (!hasProgress) return
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', onBeforeUnload)
  return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [answers])

  const onNext = () => {
    if (!q || choice == null) return
    // store text choice for this round index offsetting after Round A length
    // Use an offset far from A to avoid collisions (e.g., add 100)
    recordAnswer(100 + index, choice)
    setChoice(null)
    if (index + 1 < basicQuestions.length) setIndex(index + 1)
    else nav('/results')
  }

  if (!q) return null

  return (
    <Stack spacing={2}>
      <Stack spacing={0.5} sx={{ color: 'text.secondary' }}>
        <Typography variant="body2">Round B: Basics — Color models and gamuts</Typography>
      </Stack>
      <Box role="separator" aria-hidden sx={{ width: '100%', borderTop: '1px solid #ffffff', borderBottom: '1px solid #7f7f7f' }} />
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6">Question {index + 1} of {basicQuestions.length}</Typography>
            <LinearProgress variant="determinate" value={progress} />
            <Typography variant="subtitle1">{q.text}</Typography>
            <Stack spacing={1}>
              {q.options.map((opt) => (
                <Box
                  key={opt}
                  onClick={() => setChoice(opt)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setChoice(opt) }}
                  role="button"
                  tabIndex={0}
                  aria-label={opt}
                  aria-pressed={choice === opt}
                  sx={{
                    border: '1px solid #808080',
                    borderRadius: '6px',
                    p: 1,
                    outline: choice === opt ? '2px solid #0a64a4' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <Typography variant="body1">{opt}</Typography>
                </Box>
              ))}
            </Stack>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" onClick={onNext} disabled={!choice}>
                {index + 1 < basicQuestions.length ? 'Next' : 'Finish'}
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}
