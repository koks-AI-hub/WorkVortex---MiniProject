import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaBars, FaTimes, FaUser, FaBriefcase, FaSearch, FaSignOutAlt 
} from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../style/Sidebar.css";

const Sidebar = ({ userType }) => {
  const [isOpen, setIsOpen] = useState(true);
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

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-header">
        {isOpen && <h2 className="logo">{userType} Dashboard</h2>}
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <ul className="sidebar-menu">
        <li><Link to="profile" className="menu-item"><FaUser /><span>{isOpen && "Profile"}</span></Link></li>
        
        {userType === "Employee" ? (
          <>
            <li><Link to="jobs" className="menu-item"><FaBriefcase /><span>{isOpen && "Job Feed"}</span></Link></li>
            <li><Link to="applications" className="menu-item"><FaBriefcase /><span>{isOpen && "Applications"}</span></Link></li>
          </>
        ) : (
          <>
            <li><Link to="post-job" className="menu-item"><FaBriefcase /><span>{isOpen && "Post Job"}</span></Link></li>
            <li><Link to="search-workers" className="menu-item"><FaSearch /><span>{isOpen && "Search Workers"}</span></Link></li>
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
