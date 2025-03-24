import { db } from "../firebase";
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { supabase } from "./supabaseClient";

/**
 * Upload profile picture to Supabase and return the signed URL.
 * @param {string} employeeId - Unique ID for the employee.
 * @param {File} file - Profile picture file to upload.
 * @returns {string} - Signed URL of the uploaded profile picture.
 */
export const uploadProfilePicToSupabase = async (employeeId, file) => {
  try {
    const fileName = `${employeeId}-${Date.now()}`;
    const { data, error } = await supabase.storage
      .from("profilepic") // Ensure this matches your bucket name
      .upload(fileName, file);

    if (error) {
      throw new Error("Error uploading profile picture to Supabase: " + error.message);
    }

    // Generate a signed URL for the uploaded file
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from("profilepic") // Ensure this matches your bucket name
      .createSignedUrl(fileName, 60 * 60 * 24 * 7); // Signed URL valid for 7 days

    if (signedUrlError) {
      throw new Error("Error generating signed URL: " + signedUrlError.message);
    }

    return signedUrlData.signedUrl;
  } catch (error) {
    console.error("Error in uploadProfilePicToSupabase:", error.message);
    throw error;
  }
};

/**
 * Store employee data in Firestore.
 * @param {string} employeeId - Unique ID for the employee.
 * @param {object} data - Employee data to store.
 */
export const storeEmployeeData = async (employeeId, data) => {
  try {
    const employeeRef = doc(db, "users", employeeId);
    await setDoc(employeeRef, data, { merge: true }); // Merge to avoid overwriting
  } catch (error) {
    console.error("Error storing employee data:", error);
    throw error;
  }
};

/**
 * Retrieve employee data from Firestore.
 * @param {string} employeeId - Unique ID for the employee.
 * @returns {object|null} - Employee data (filtered) or null if not found.
 */
export const retrieveEmployeeData = async (employeeId) => {
  try {
    const employeeRef = doc(db, "users", employeeId);
    const employeeDoc = await getDoc(employeeRef);

    if (employeeDoc.exists()) {
      const data = employeeDoc.data();
      const filteredData = {
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        profilePic: data.profilePic || null,
        address: data.address || "",
        dob: data.dob || "",
        degree: data.degree || "",
      };
      return filteredData;
    } else {
      console.log("No employee data found.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving employee data:", error);
    throw error;
  }
};

/**
 * Retrieve employee data in real-time from Firestore.
 * @param {string} employeeId - Unique ID for the employee.
 * @param {function} callback - Callback function to handle real-time data.
 */
export const listenToEmployeeData = (employeeId, callback) => {
  try {
    const employeeRef = doc(db, "users", employeeId);
    return onSnapshot(employeeRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const filteredData = {
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          profilePic: data.profilePic || null,
          address: data.address || "",
          dob: data.dob || "",
          degree: data.degree || "",
        };
        callback(filteredData);
      } else {
        console.log("No employee data found.");
        callback(null);
      }
    });
  } catch (error) {
    console.error("Error listening to employee data:", error);
    throw error;
  }
};