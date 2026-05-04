import React, { useEffect, useState } from "react";
import API from "../api";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await API.get("/auth/profile", {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      setUser(res.data);
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {user && (
        <>
          <p>{user.name}</p>
          <p>{user.email}</p>
          {user.image && (
            <img 
              src={`http://localhost:5000/uploads/${user.image}`} 
              width="150" 
              alt="Profile"
            />
          )}
        </>
      )}
    </div>
  );
}

export default Profile;