import { Route, Routes } from 'react-router-dom'
import { Container, Box } from '@mui/material'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import ResultsPage from './pages/ResultsPage'
import { QuizProvider } from './context/QuizContext'

export default function App() {
  return (
    <QuizProvider>
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
