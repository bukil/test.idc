import { Button, Card, CardContent, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Welcome to the Simple Quiz
        </Typography>
        <Typography paragraph>
          Click start to begin the quiz.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/quiz">
          Start Quiz
        </Button>
      </CardContent>
    </Card>
  )
}
