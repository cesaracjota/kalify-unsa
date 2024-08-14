import { extendTheme } from '@chakra-ui/react';
import '@fontsource-variable/inter';

const theme = extendTheme({
  fonts: {
    heading: `"Inter Variable", InterVariable, Inter, sans-serif`,
    body: `"Inter Variable", InterVariable, Inter, sans-serif`,
  },
  colors: {
    primary: {
      50: '#F0FFF4',
      100: '#C6F6D5',
      200: '#9AE6B4',
      300: '#68D391',
      400: '#48BB78',
      500: '#38A169',
      600: '#2F855A',
      700: '#276749',
      800: '#22543D',
      900: '#13161c',
      1000: '#13161c',
      1100: '#13161c',
      1200: '#0D0F14',
    },
  },
})


export default theme;