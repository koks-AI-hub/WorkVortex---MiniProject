import { useState, useEffect } from "react";
import "../../style/EmployeeProfile.css";
import { storeEmployeeData, listenToEmployeeData, uploadProfilePicToSupabase } from "../../services/firebaseEmployeeService";

const EmployeeProfile = () => {
  const employeeId = sessionStorage.getItem("userPhone"); // Use phone number as unique ID
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    profilePic: null,
    address: "",
    dob: "",
    degree: "",
  });
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({}); // For validation errors

  // Listen to real-time updates
  useEffect(() => {
    if (employeeId) {
      const unsubscribe = listenToEmployeeData(employeeId, (data) => {
        if (data) {
          setProfileData(data);
        }
      });
      return () => unsubscribe();
    }
  }, [employeeId]);

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Upload to Supabase and get the signed URL
        const signedUrl = await uploadProfilePicToSupabase(employeeId, file);

        // Update Firestore with the signed URL
        const updatedProfileData = { ...profileData, profilePic: signedUrl };
        setProfileData(updatedProfileData);
        await storeEmployeeData(employeeId, updatedProfileData);

      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!profileData.name.trim()) newErrors.name = "Full Name is required.";
    if (!profileData.address.trim()) newErrors.address = "Address is required.";
    if (!profileData.dob.trim()) newErrors.dob = "Date of Birth is required.";
    if (!profileData.degree.trim()) newErrors.degree = "Degree is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditToggle = async () => {
    if (editing) {
      // Validate fields before saving
      if (!validateFields()) return;

      // Save changes to Firebase
      try {
        await storeEmployeeData(employeeId, profileData);
        console.log("Profile updated successfully.");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
    setEditing(!editing);
  };

  return (
    <div className="tab-panel">
      <div className="profile-card">
        <div className="profile-pic-container">
          <label htmlFor="profilePicUpload">
            <img
              src={profileData.profilePic || "https://via.placeholder.com/150"}
              alt="Profile"
              className="profile-pic"
            />
          </label>
          <input
            type="file"
            id="profilePicUpload"
            accept="image/*"
            onChange={handleProfilePicChange}
            disabled={!editing}
          />
        </div>

        <div className="info-section">
          <div className="form-group">
            <label>Full Name</label>
            {editing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </>
            ) : (
              <span className="info-text">{profileData.name || "N/A"}</span>
            )}
          </div>
          <div className="form-group">
            <label>Email</label>
            <span className="info-text">{profileData.email || "N/A"}</span> {/* Non-editable */}
          </div>
          <div className="form-group">
            <label>Phone</label>
            <span className="info-text">{profileData.phone || "N/A"}</span> {/* Non-editable */}
          </div>
          <div className="form-group">
            <label>Address</label>
            {editing ? (
              <>
                <textarea
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className="address-input"
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </>
            ) : (
              <span className="info-text">{profileData.address || "N/A"}</span>
            )}
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            {editing ? (
              <>
                <input
                  type="date"
                  name="dob"
                  value={profileData.dob}
                  onChange={handleInputChange}
                />
                {errors.dob && <span className="error-text">{errors.dob}</span>}
              </>
            ) : (
              <span className="info-text">{profileData.dob || "N/A"}</span>
            )}
          </div>
          <div className="form-group">
            <label>Degree</label>
            {editing ? (
              <>
                <input
                  type="text"
                  name="degree"
                  value={profileData.degree}
                  onChange={handleInputChange}
                />
                {errors.degree && <span className="error-text">{errors.degree}</span>}
              </>
            ) : (
              <span className="info-text">{profileData.degree || "N/A"}</span>
            )}
          </div>

          <button className="save-btn" onClick={handleEditToggle}>
            {editing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
