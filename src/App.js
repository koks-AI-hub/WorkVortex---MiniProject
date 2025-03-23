import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import LandingPage from "./pages/LandingPage";
import Unauthorized from "./components/Unauthorized";
import NotFound from "./components/NotFound";
import AuthPage from "./pages/AuthPage";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<SplashScreen />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />    
      <Route path="/register" element={<AuthPage type="register" />} />
      <Route path="/login" element={<AuthPage type="login" />} />
      <Route path="/company-register" element={<AuthPage type="register" />} />
      <Route 
        path="/dashboard" 
        element={<ProtectedRoute allowedRoles={["employee"]}><EmployeeDashboard /></ProtectedRoute>} 
      />
    
      <Route 
        path="/company-dashboard" 
        element={<ProtectedRoute allowedRoles={["company"]}><CompanyDashboard /></ProtectedRoute>} 
      />

        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
