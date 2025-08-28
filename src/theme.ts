import { createTheme } from '@mui/material/styles'

// Windows ME–style: light greys, square corners, beveled (3D) edges, no shadows
const bg = '#C0C0C0' // classic system grey
const paper = '#DFDFDF'
const borderLight = '#FFFFFF'
const borderDark = '#808080'
const titleSolid = '#0a64a4'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0a64a4', contrastText: '#ffffff' },
    secondary: { main: '#2a78c2' },
    background: { default: bg, paper },
    text: { primary: '#000000', secondary: '#222' },
  },
  shape: { borderRadius: 0 },
  shadows: Array(25).fill('none') as any,
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backgroundColor: titleSolid,
          borderBottom: `2px solid ${borderDark}`,
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: paper,
          border: `1px solid ${borderDark}`,
          boxShadow: 'none',
          // Bevel: light on top/left, dark on bottom/right
          borderTopColor: borderLight,
          borderLeftColor: borderLight,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: `1px solid ${borderDark}`,
          borderTopColor: borderLight,
          borderLeftColor: borderLight,
          backgroundColor: '#dcdcdc',
          color: '#000',
          boxShadow: 'none',
          textTransform: 'none',
          '&:active': {
            // Pressed look: invert bevel
            borderTopColor: borderDark,
            borderLeftColor: borderDark,
            borderBottomColor: borderLight,
            borderRightColor: borderLight,
            backgroundColor: '#eaeaea',
          },
        },
        contained: {
          boxShadow: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundColor: '#fff',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: borderDark,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#666',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#333',
          },
        },
      },
    },
  },
})
