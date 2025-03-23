import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { query, collection, where, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineUser,
  AiOutlinePhone,
  AiOutlineHome,
  AiOutlineLock,
  AiOutlineAppstore,
} from "react-icons/ai";
import "../style/Auth.css";

const AuthPage = ({ type }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    sector: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [role, setRole] = useState("employee");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleFromURL = params.get("role");
    if (roleFromURL === "company") setRole("company");
  }, [location.search]);

  const validatePassword = (pwd) => {
    if (!pwd) return "";
    const lengthCriteria = pwd.length >= 8;
    const uppercaseCriteria = /[A-Z]/.test(pwd);
    const numberCriteria = /[0-9]/.test(pwd);
    const specialCharCriteria = /[^A-Za-z0-9]/.test(pwd);
    const score = [lengthCriteria, uppercaseCriteria, numberCriteria, specialCharCriteria].filter(Boolean).length;

    if (score === 4) return "Strong";
    if (score === 3) return "Medium";
    if (score === 2) return "Weak";
    return "Very Weak";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    if (name === "password") {
      setPasswordStrength(validatePassword(value));
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    const { email, password, confirmPassword, name, phone, sector, address } = formData;
  
    if (type === "register") {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }
      if (passwordStrength === "Weak" || passwordStrength === "Very Weak") {
        setError("Password must be at least Medium strength.");
        setLoading(false);
        return;
      }
  
      try {
        const phoneQuery = await getDoc(doc(db, "users", phone));
        if (phoneQuery.exists()) {
          setError("Phone number is already in use.");
          setLoading(false);
          return;
        }
  
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        const userData = { name, email, phone, password, role };
        if (role === "company") {
          userData.sector = sector;
          userData.address = address;
        }
  
        await setDoc(doc(db, "users", phone), userData);
  
        await sendEmailVerification(user);
  
        alert("Registration successful. Please verify your email before logging in.");
        navigate("/login");
      } catch (err) {
        setError(err.message || "Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // if (!user.emailVerified) {
        //   setError("Verify your email before logging in.");
        //   setLoading(false);
        //   return;
        // }

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setError("User not found. Please register first.");
          setLoading(false);
          return;
        }
        
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        sessionStorage.setItem("userRole", userData.role);
        sessionStorage.setItem("userEmail", userData.email);
        sessionStorage.setItem("userPhone", userData.phone);

        navigate(userData.role === "employee" ? "/dashboard" : "/company-dashboard");
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{type === "register" ? `${role === "company" ? "Company" : "Employee"} Register` : `${role === "company" ? "Company" : "Employee"} Login`}</h1>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleAuth}>
          {type === "register" && (
            <div className="input-field">
              <AiOutlineUser className="input-icon" />
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div className="input-field">
            <AiOutlineMail className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          {type === "register" && (
            <div className="input-field">
              <AiOutlinePhone className="input-icon" />
              <input
                type="text"
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          {role === "company" && type === "register" && (
            <>
              <div className="input-field">
                <AiOutlineAppstore className="input-icon" />
                <input type="text" placeholder="Sector" name="sector" value={formData.sector} onChange={handleInputChange} required />
              </div>
              <div className="input-field">
                <AiOutlineHome className="input-icon" />
                <input type="text" placeholder="Address" name="address" value={formData.address} onChange={handleInputChange} required />
              </div>
            </>
          )}
          <div className="input-field password-container">
            <AiOutlineLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <span className="password-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          {type === "register" && formData.password && (
            <p className={`password-strength ${passwordStrength.toLowerCase()}`}>Strength: {passwordStrength}</p>
          )}
          {type === "register" && (
            <div className="input-field password-container">
              <AiOutlineLock className="input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <span className="password-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          )}
          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Processing..." : type === "register" ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p className="toggle-link" onClick={() => navigate("/landing")}>Select Role again ?</p>
        <p className="toggle-link">
          {type === "register" ? (
            <> Already have an account? <span onClick={() => navigate("/login")}>Login</span></>
          ) : (
            <> Don't have an account? <span onClick={() => navigate("/register?role=employee")}>Register</span></>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
