import React from 'react';
import { CryptoTable } from './features/crypto/CryptoTable';
import { Container, Typography, Box, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" color="primary">
            Crypto Price Tracker
          </Typography>
          <CryptoTable />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
