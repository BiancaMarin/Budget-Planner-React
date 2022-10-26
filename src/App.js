import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
