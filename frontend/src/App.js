// Frontend: App.js
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './features/gym/Home';
import User from './features/user/User';
import RegisterPage from './features/user/RegisterPage';
import LoginPage from './features/user/LoginPage';
import Dashboard from './features/admin/Dashboard';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user.role === 'admin';

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<User />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={isAdmin ? <Dashboard /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
