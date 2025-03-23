import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  FaBars, FaTimes, FaUser, FaBriefcase, FaSearch, FaSignOutAlt 
} from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../style/Sidebar.css";

const Sidebar = ({ userType }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem("userRole"); 
      sessionStorage.removeItem("userEmail");
      sessionStorage.removeItem("userPhone");
      navigate("/landing");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const isActive = (path) => location.pathname === path; // Check if the tab is active

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-header">
        {isOpen && <h2 className="logo">{userType} Dashboard</h2>}
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <ul className="sidebar-menu">
        <li className={isActive("/dashboard/profile") ? "active" : ""}>
          <Link 
            to="/dashboard/profile" 
            className="menu-item" 
            onClick={() => setIsOpen(false)} 
          >
            <FaUser />
            <span>{isOpen && "Profile"}</span>
          </Link>
        </li>
        
        {userType === "Employee" ? (
          <>
            <li className={isActive("/dashboard/jobs") ? "active" : ""}>
              <Link 
                to="/dashboard/jobs" 
                className="menu-item" 
                onClick={() => setIsOpen(false)} // Close sidebar on tab click
              >
                <FaBriefcase />
                <span>{isOpen && "Job Feed"}</span>
              </Link>
            </li>
            <li className={isActive("/dashboard/applications") ? "active" : ""}>
              <Link 
                to="/dashboard/applications" 
                className="menu-item" 
                onClick={() => setIsOpen(false)} // Close sidebar on tab click
              >
                <FaBriefcase />
                <span>{isOpen && "Applications"}</span>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className={isActive("/dashboard/post-job") ? "active" : ""}>
              <Link 
                to="/company-dashboard/post-job" 
                className="menu-item" 
                onClick={() => setIsOpen(false)} // Close sidebar on tab click
              >
                <FaBriefcase />
                <span>{isOpen && "Post Job"}</span>
              </Link>
            </li>
            <li className={isActive("/dashboard/search-workers") ? "active" : ""}>
              <Link 
                to="/company-dashboard/search-workers" 
                className="menu-item" 
                onClick={() => setIsOpen(false)}
              >
                <FaSearch />
                <span>{isOpen && "Search Workers"}</span>
              </Link>
            </li>
          </>
        )}

        <li className="logout" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>{isOpen && "Logout"}</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
