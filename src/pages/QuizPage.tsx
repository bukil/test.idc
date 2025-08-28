import { useMemo, useState } from 'react'
import { Button, Card, CardContent, Typography, Stack, LinearProgress, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'

export default function QuizPage() {
  const { questions, recordAnswer, reset } = useQuiz()
  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState<number | null>(null)
  const nav = useNavigate()

  const q = useMemo(() => questions[index], [questions, index])
  const progress = Math.round(((index) / questions.length) * 100)

  const onNext = () => {
    if (choice === null) return
    // Store the actual color value selected
    recordAnswer(index, q.options[choice])
    setChoice(null)
    if (index + 1 < questions.length) setIndex(index + 1)
    else nav('/results')
  }

  const onRestart = () => {
  reset()
  setIndex(0)
  setChoice(null)
  }

  if (!q) return null

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6">Question {index + 1} of {questions.length}</Typography>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="subtitle1">{q.text}</Typography>
          <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
            {q.options.map((opt, i) => (
              <Box
                key={i}
                onClick={() => setChoice(i)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setChoice(i) }}
                role="button"
                tabIndex={0}
                aria-label={`option ${i + 1}`}
                aria-pressed={choice === i}
                sx={{
                  width: 96,
                  height: 96,
                  backgroundColor: opt,
                  border: '1px solid #808080',
                  borderTopColor: '#ffffff',
                  borderLeftColor: '#ffffff',
                  cursor: 'pointer',
                  outline: choice === i ? '2px solid #0a64a4' : 'none',
                }}
              />
            ))}
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={onRestart}>Restart</Button>
            <Button variant="contained" onClick={onNext} disabled={choice === null}>
              {index + 1 < questions.length ? 'Next' : 'Finish'}
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
