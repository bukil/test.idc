import { Route, Routes } from 'react-router-dom'
import { Container, Box, Stack, Typography } from '@mui/material'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import RoundBPage from './pages/RoundBPage'
import GamutPage from './pages/GamutPage'
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
              <Route path="/round-b" element={<RoundBPage />} />
              <Route path="/gamut" element={<GamutPage />} />
            </Routes>
          </Container>
        </Box>
  {/* Single grey line above footer */}
  <Box role="separator" aria-hidden sx={{ width: '100%', borderTop: '1px solid #7f7f7f' }} />
        <Box component="footer" sx={{ py: 2 }}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 1,
              px: 2,
            }}
          >
            <Box
              component="img"
              src={`${import.meta.env.BASE_URL}idc.png`}
              alt="IDC"
              sx={{ height: { xs: 16, sm: 18 }, width: 'auto', maxWidth: '40%' }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 1, minWidth: 0, maxWidth: '100%' }}>
              <Box
                component="img"
                src={`${import.meta.env.BASE_URL}by.png`}
                alt="BY"
                sx={{ height: { xs: 14, sm: 16 }, width: 'auto', flexShrink: 0 }}
              />
              <Typography
                variant="caption"
                component="div"
                sx={{ textAlign: 'right', whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'anywhere', lineHeight: 1.4 }}
                dangerouslySetInnerHTML={{
                  __html:
                    '<a href="https://bukil.github.io/test.idc/">Color Test</a> © 2025 by <a href="https://www.linkedin.com/in/mukilk/">Mukil Kumar</a> is licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;">',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </QuizProvider>
  )
}
