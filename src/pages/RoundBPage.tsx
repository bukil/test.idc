import { useState, useMemo, useEffect } from 'react'
import { Button, Card, CardContent, Typography, Stack, Box, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { round2Questions } from '../data/round2'
import { useQuiz } from '../context/QuizContext'

export default function RoundBPage() {
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState<string>('')
  const nav = useNavigate()
  const { recordAnswer, answers } = useQuiz()

  const q = useMemo(() => round2Questions[index], [index])
    // const progress = Math.round((index / round2Questions.length) * 100)

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
    if (!q) return
    const normalized = input.trim().toLowerCase()
    recordAnswer(100 + index, normalized)
    setInput('')
  if (index + 1 < round2Questions.length) setIndex(index + 1)
  else nav('/gamut')
  }

  if (!q) return null

  return (
    <Stack spacing={2}>
      <Stack spacing={0.5} sx={{ color: 'text.secondary' }}>
        <Typography variant="body2">Round 2: name the given non primary colors</Typography>
      </Stack>
      <Box role="separator" aria-hidden sx={{ width: '100%', borderTop: '1px solid #ffffff', borderBottom: '1px solid #7f7f7f' }} />
      <Card>
        <CardContent>
          <Stack spacing={2}>
              {/* Removed progress indicator and per-question text */}
            <Box sx={{
              height: 120,
              border: '1px solid #808080',
              borderRadius: '6px',
              backgroundColor: q.hex,
            }} />
            {/* No per-question hint to avoid revealing answers */}
            <TextField
              label="Type the color name"
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') onNext() }}
              placeholder="color name"
              inputProps={{ 'aria-label': 'color name input' }}
            />
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" onClick={onNext} disabled={input.trim() === ''}>
                {index + 1 < round2Questions.length ? 'Next' : 'Finish'}
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}
