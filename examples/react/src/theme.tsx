import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

// eslint-disable-next-line quotes
const fonts = { mono: "'Menlo', monospace" }

const theme = extendTheme({
  colors: {
    black: '#16161D',
  },
  fonts,
  breakpoints: {
    sm: '40em',
    md: '52em',
    lg: '64em',
    xl: '80em',
  },
  global: (props: any) => ({
    body: {
      bg: mode('gray.50', 'gray.900')(props),
      color: mode('black', 'white')(props),
    },
  }),
})

export default theme
