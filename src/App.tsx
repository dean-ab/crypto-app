import { useEffect, useState } from 'react';
import { fetchCoins } from './api';
import './App.scss';
import { CoinsTable } from './components/CoinsTable';
import { Coin } from './types';
import Button from '@mui/material/Button';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    fetchCoins().then((res) => setCoins(res));
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <main
        style={{
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <h1>My Crypto App</h1>
        <CoinsTable coins={coins} />
        <Button>LOAD MORE COINS</Button>
      </main>
    </ThemeProvider>
  );
}

export default App;
