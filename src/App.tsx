import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useParams,
  Link,
} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Dashboard } from './components/Dashboard';
import { History } from './routes/History';
import styles from './App.module.scss';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <span className={styles.navTitle}>My Crypto App</span>
      </Link>
      <div className={styles.navLinks}>
        <Link className={styles.link} to="/history">
          Transaction History
        </Link>
      </div>
    </nav>
  );
};

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Navbar />
        <main style={{ marginTop: 40 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
