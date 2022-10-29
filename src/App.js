import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './features/Auth/Auth';
import { AuthContextProvider } from './features/Auth/AuthContext';
import Dashboard from './features/Dashboard/Dashboard';
import HomePage from './features/HomePage/HomePage';

function App() {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
