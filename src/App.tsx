import { Box, ColorModeScript } from '@chakra-ui/react';
import theme from './components/Theme/theme';
import { AuthProvider } from './context/auth-provider.context';
import Router from './routes';

function App() {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <AuthProvider>
          <Box>
            <Router />
          </Box>
        </AuthProvider>
    </>
  );
}

export default App;
