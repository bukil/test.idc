import { Route, Routes, Link } from 'react-router-dom'
import { Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import ResultsPage from './pages/ResultsPage'
import { QuizProvider } from './context/QuizContext'

export default function App() {
  return (
    <QuizProvider>
  <AppBar position="static" color="primary" sx={{ boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Simple Quiz
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box my={4}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </Box>
      </Container>
    </QuizProvider>
  )
}
