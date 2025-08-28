import { Button, Card, CardContent, Typography, Stack, List, ListItem, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'

export default function ResultsPage() {
  const { questions, answers, score, reset } = useQuiz()

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5">Your Score: {score()} / {questions.length}</Typography>
          <List>
            {questions.map((q, idx) => {
              const selected = answers[idx]
              const correct = q.answer
              const isCorrect = selected === correct
              return (
                <ListItem key={q.id} divider>
                  <ListItemText
                    primary={`${idx + 1}. ${q.text}`}
                    secondary={`Your answer: ${selected ?? '-'} | Correct: ${correct}`}
                    primaryTypographyProps={{ color: isCorrect ? 'success.main' : 'error.main' }}
                  />
                </ListItem>
              )
            })}
          </List>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={reset}>Try Again</Button>
            <Button variant="contained" component={Link} to="/">Back Home</Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
