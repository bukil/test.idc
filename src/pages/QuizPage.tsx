import { useMemo, useState } from 'react'
import { Button, Card, CardContent, Typography, Stack, LinearProgress, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'

export default function QuizPage() {
  const { questions, recordAnswer, reset } = useQuiz()
  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState<string>('')
  const nav = useNavigate()

  const q = useMemo(() => questions[index], [questions, index])
  const progress = Math.round(((index) / questions.length) * 100)

  const onNext = () => {
    if (!choice) return
    recordAnswer(index, choice)
    setChoice('')
    if (index + 1 < questions.length) setIndex(index + 1)
    else nav('/results')
  }

  const onRestart = () => {
    reset()
    setIndex(0)
    setChoice('')
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
                onClick={() => setChoice(opt)}
                role="button"
                aria-label={`option ${i + 1}`}
                sx={{
                  width: 96,
                  height: 96,
                  backgroundColor: opt,
                  border: '1px solid #808080',
                  borderTopColor: '#ffffff',
                  borderLeftColor: '#ffffff',
                  cursor: 'pointer',
                  outline: choice === opt ? '2px solid #0a64a4' : 'none',
                }}
              />
            ))}
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={onRestart}>Restart</Button>
            <Button variant="contained" onClick={onNext} disabled={!choice}>
              {index + 1 < questions.length ? 'Next' : 'Finish'}
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
