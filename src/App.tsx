import { Route, Routes } from 'react-router-dom'
import { Container, Box, Stack, Typography } from '@mui/material'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import ResultsPage from './pages/ResultsPage'
import { QuizProvider } from './context/QuizContext'

export default function App() {
  return (
    <QuizProvider>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Container maxWidth="md">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/results" element={<ResultsPage />} />
            </Routes>
          </Container>
        </Box>
        <Box component="footer" sx={{ py: 2 }}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', px: 2 }}>
            <Typography
              variant="caption"
              component="div"
              sx={{ textAlign: 'right' }}
              dangerouslySetInnerHTML={{
                __html:
                  '<a href="https://bukil.github.io/test.idc/">Color Test</a> © 2025 by <a href="https://www.linkedin.com/in/mukilk/">Mukil Kumar</a> is licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;">',
              }}
            />
          </Box>
        </Box>
      </Box>
    </QuizProvider>
  )
}
