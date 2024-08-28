import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';

import './index.css';

const config = {
  initialColorMode: 'Dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
