import { useEffect, useMemo, useState } from 'react'
import { Button, Card, CardContent, Typography, Stack, LinearProgress, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'

export default function QuizPage() {
  const { questions, recordAnswer, answers } = useQuiz()
  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState<number | null>(null)
  const nav = useNavigate()

  const q = useMemo(() => questions[index], [questions, index])
  const progress = Math.round(((index) / questions.length) * 100)

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
    if (choice === null) return
    // Store the actual color value selected
    recordAnswer(index, q.options[choice])
    setChoice(null)
    if (index + 1 < questions.length) setIndex(index + 1)
    else nav('/results')
  }

  // Restart removed per requirements

  if (!q) return null

  return (
    <Stack spacing={2}>
      {/* Instructions outside the panel */}
      <Stack spacing={0.5} sx={{ color: 'text.secondary' }}>
        <Typography variant="body2">Click the disk that's a different color. Use your eyes only! Make sure to disable any blue-light filter on your screen.</Typography>
        <Typography variant="body2" lang="hi">जिस डिस्क का रंग अलग है, उस पर क्लिक करें। केवल अपनी आँखों का उपयोग करें! सुनिश्चित करें कि आपकी स्क्रीन पर कोई ब्लू-लाइट फ़िल्टर चालू न हो।</Typography>
        <Typography variant="body2" lang="mr">ज्या डिस्कचा रंग वेगळा आहे त्यावर क्लिक करा. फक्त डोळ्यांचा वापर करा! आपल्या स्क्रीनवर कोणताही ब्लू-लाइट फिल्टर चालू नसल्याची खात्री करा.</Typography>
      </Stack>
      {/* Windows ME-style beveled divider under instructions */}
      <Box role="separator" aria-hidden sx={{ width: '100%', borderTop: '1px solid #ffffff', borderBottom: '1px solid #7f7f7f' }} />
      <Card sx={{ borderRadius: '8px !important' }}>
        <CardContent sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h6">Question {index + 1} of {questions.length}</Typography>
            <LinearProgress variant="determinate" value={progress} />
            <Typography variant="subtitle1">{q.text}</Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, auto)',
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
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
        borderRadius: '8px !important',
                    cursor: 'pointer',
                    outline: choice === i ? '2px solid #0a64a4' : 'none',
                  }}
                />
              ))}
            </Box>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="contained"
                size="large"
                sx={{ minWidth: 200, px: 3, borderRadius: '6px !important' }}
                onClick={onNext}
                disabled={choice === null}
              >
                {index + 1 < questions.length ? 'Next' : 'Finish'}
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
  {/* end */}
    </Stack>
  )
}
