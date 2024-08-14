import React from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import theme from './theme/theme';
import { AppRouter } from './routes/AppRouter';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppRouter />
    </ChakraProvider>
  );
}

export default App;
