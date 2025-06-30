import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";

import axios from "axios";
import Swal from "sweetalert2";

const CLIENT_ID =
  "666978640787-bmlj22iesrchno5hjk397bhdl68cu832.apps.googleusercontent.com"; // Replace with your actual Client ID
const CLIENT_SECRET = "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"; // Replace with your Client Secret from Google Cloud
const REDIRECT_URI = "https://lembest.web.app"; // Change this based on your app's redirect URI

const FileSubmit = ({ file, onUploadComplete }) => {
  const [token, setToken] = useState(null);

  // Function to exchange authorization code for access token
  const exchangeToken = async (authCode) => {
    try {
      const response = await axios.post("https://oauth2.googleapis.com/token", {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: authCode,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
      });

      setToken(response.data.access_token);
      console.log("Access Token:", response.data.access_token);
    } catch (error) {
      console.error("Error exchanging token:", error.response?.data || error);
    }
  };

  // Google Login Hook
  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log("Google Login Successful!", response);
      exchangeToken(response.code);
    },
    onError: (error) => console.error("Google Login Failed:", error),
    flow: "auth-code",
  });

  useEffect(() => {
    if (file && token) {
      uploadFile();
    } else if (!token) {
      Swal.fire({
        title: "Google Log In Required",
        text: "Please sign in with your Google account to continue.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login with Google",
      }).then((result) => {
        if (result.isConfirmed) {
          login();
        }
      });
    }
  }, [file, token]);

  const uploadFile = async () => {
    if (!file || !token) return;

    const metadata = {
      name: file.name,
      mimeType: file.type,
    };

    const formData = new FormData();
    formData.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const fileId = response.data.id;

      await axios.post(
        `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,
        {
          role: "reader",
          type: "anyone",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const shareableLink = `https://drive.google.com/uc?id=${fileId}`;
      console.log("File uploaded! Shareable link:", shareableLink);

      if (onUploadComplete) {
        onUploadComplete(shareableLink);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // return (
  //   <div>
  //     <h3>Upload to Google Drive</h3>
  //     {!token ? (
  //       <button onClick={() => login()}>Login with Google</button>
  //     ) : (
  //       <p>Logged in! Uploading...</p>
  //     )}
  //   </div>
  // );

  return null;
};

export default FileSubmit;
