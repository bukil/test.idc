import { Button, Card, CardContent, Typography, Stack, List, ListItem, ListItemText, Box, Divider } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { Link } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import { round2Questions } from '../data/round2'

export default function ResultsPage() {
  const { questions, answers, score, reset } = useQuiz()
  const totalQuestions = questions.length

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5">Your Score (Round 1 only): {score()} / {totalQuestions}</Typography>
          {/* Scrollable results (both sections) */}
          <Box sx={{ maxHeight: { xs: '60vh', sm: '70vh' }, overflowY: 'auto', pr: 1 }}>
            {/* Round A (Odd-one-out) */}
            <List>
              {questions.map((q, idx) => {
                const selected = answers[idx]
                const correct = q.answer
                const isCorrect = selected === correct
                return (
                  <ListItem key={q.id} divider sx={{ display: 'flex', alignItems: 'center' }}>
                    <ListItemText
                      primary={`${idx + 1}. ${q.text}`}
                      primaryTypographyProps={{ color: isCorrect ? 'success.main' : 'error.main' }}
                      secondary={
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="caption">Your:</Typography>
                            <Box
                              sx={{
                                width: 16,
                                height: 16,
                                border: selected ? '2px solid' : '1px solid',
                                borderColor: selected ? (isCorrect ? 'success.main' : 'error.main') : '#808080',
                                backgroundColor: selected || 'transparent',
                              }}
                            />
                            <Typography variant="caption">{selected ?? '-'}</Typography>
                          </Stack>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="caption">Correct:</Typography>
                            <Box sx={{ width: 16, height: 16, border: '2px solid', borderColor: 'success.main', backgroundColor: correct }} />
                            <Typography variant="caption">{correct}</Typography>
                          </Stack>
                        </Stack>
                      }
                    />
                    <Box sx={{ ml: 2, marginLeft: 'auto' }}>
                      {isCorrect ? (
                        <CheckCircleIcon sx={{ color: 'success.main' }} />
                      ) : (
                        <CancelIcon sx={{ color: 'error.main' }} />
                      )}
                    </Box>
                  </ListItem>
                )
              })}
            </List>
            <Divider sx={{ my: 2 }} />
            {/* Round 2 (Names, ungraded) */}
            <Typography variant="h6" sx={{ mb: 1 }}>Round 2: Names collected (no right or wrong)</Typography>
            <List>
              {round2Questions.map((q, i) => {
                const idx = 100 + i
                const selected = (answers[idx] || '').toLowerCase().trim()
                return (
                  <ListItem key={q.id} divider sx={{ display: 'flex', alignItems: 'center' }}>
                    <ListItemText
                      primary={`Color shown: ${q.hex}`}
                      secondary={`Your: ${selected || '-'}`}
                    />
                  </ListItem>
                )
              })}
            </List>
            <Divider sx={{ my: 2 }} />
            {/* Round 3 (Gamut pick, ungraded) */}
            <Typography variant="h6" sx={{ mb: 1 }}>Round 3: Gamut pick (no right or wrong)</Typography>
            <List>
              {(() => {
                const picked = answers[200]
                const target = answers[201]
                return (
                  <ListItem divider>
                    <ListItemText
                      primary="Your pick vs target"
                      secondary={<Stack direction="row" spacing={2} alignItems="center">
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="caption">Your:</Typography>
                          <Box sx={{ width: 16, height: 16, border: '1px solid #808080', backgroundColor: picked || 'transparent' }} />
                          <Typography variant="caption">{picked || '-'}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="caption">Target:</Typography>
                          <Box sx={{ width: 16, height: 16, border: '1px solid #808080', backgroundColor: target || 'transparent' }} />
                          <Typography variant="caption">{target || '-'}</Typography>
                        </Stack>
                      </Stack>}
                    />
                  </ListItem>
                )
              })()}
            </List>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={reset}>Try Again</Button>
            <Button variant="contained" component={Link} to="/">Back Home</Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
