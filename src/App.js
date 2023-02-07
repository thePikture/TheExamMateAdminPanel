import { useEffect, useState } from 'react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

// ----------------------------------------------------------------------

export default function App() {
  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const tok = sessionStorage.getItem('token');
    console.log(tok)
    if (tok !== null && tok !== '') {
      setLoggedIn(true);
      setToken(tok);
    }
  }, []);
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router loggedIn={loggedIn} token={token} />
    </ThemeProvider>
  );
}
