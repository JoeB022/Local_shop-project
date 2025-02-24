import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ClerkDashboard from './pages/ClerkDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ReportsPage from './pages/ReportsPage';
import ManageUsersPage from './pages/ManageUsersPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import NotificationsPage from './pages/NotificationsPage';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const App = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<ProtectedRoute component={user?.role === 'admin' ? AdminDashboard : ClerkDashboard} />} />
        <Route path="/reports" element={<ProtectedRoute component={ReportsPage} />} />
        <Route path="/manage-users" element={<ProtectedRoute component={ManageUsersPage} />} />
        <Route path="/profile" element={<ProtectedRoute component={ProfileSettingsPage} />} />
        <Route path="/notifications" element={<ProtectedRoute component={NotificationsPage} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;


// import React from 'react';

// const App = () => {
//   console.log("App component is rendering!");
//   return (
//     <h1>Hello, Local Shop</h1>
//     );
//     };
//     export default App;