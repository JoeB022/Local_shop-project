import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/HomePage";
import Settings from "./pages/ProfileSettings";
import ClerkDashboard from "./components/ClerkDashboard";
import AdminDashboard from "./components/AdminDashboard";
import MerchantDashboard from "./components/MerchantDashboard";
import ProfileDashboard from "./components/ProfileDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const userRole = "admin"; // This should come from authentication logic

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/clerk" element={<ClerkDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/merchant" element={<MerchantDashboard />} />
        <Route path="/profile-settings" element={<ProfileDashboard userRole={userRole} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
