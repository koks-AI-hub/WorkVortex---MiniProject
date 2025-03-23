import { useState } from "react";
import "../../style/EmployeeProfile.css";

const EmployeeProfile = () => {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 9876543210",
    address: "Chennai, Tamil Nadu",
    profilePic: null,
  });

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileData({ ...profileData, profilePic: imageUrl });
    }
  };

  return (
          <div className="tab-panel">
            <div className="profile-card">
              <div className="profile-pic-container">
                <label htmlFor="profilePicUpload">
                  <img src={profileData.profilePic || "https://via.placeholder.com/120"} alt="Profile" className="profile-pic" />
                </label>
                <input type="file" id="profilePicUpload" accept="image/*" onChange={handleProfilePicChange} />
              </div>

              <div className="info-section">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" name="name" value={profileData.name} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={profileData.email} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input type="text" name="phone" value={profileData.phone} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input type="text" name="address" value={profileData.address} onChange={handleInputChange} />
                </div>

                <button className="save-btn">Save Changes</button>
              </div>
            </div>
          </div>
  );
}

export default EmployeeProfile;