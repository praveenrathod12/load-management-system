// components/Profile/Profile.js
import React, { useContext } from 'react';
import './Profile.css';
import { AuthContext } from '../../contexts/AuthProvider';

function Profile() {
  const { userType, userEmail, loading } = useContext(AuthContext);

  if (loading) {
    return <h3 className="text-center mt-5 text-warning">Loading profile details, please wait...</h3>;
  }

  if (!userType || !userEmail) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2 className="profile-title">Please Login</h2>
          <p className="profile-description">You must be logged in to view this profile.</p>
        </div>
      </div>
    );
  }

  const userName = userEmail.split('@')[0];

  const profileDetails = {
    businessperson: {
      title: "Business Profile",
      description: "You are registered as a Business User. You can post loads and monitor their status.",
      roleSpecific: {
        Name: userName,
        Email: userEmail,
        Role: "Business Person",
        Access: "Can post and track loads",
      },
    },
    lorryowner: {
      title: "Lorry Owner Profile",
      description: "You are registered as a Lorry Owner. You can accept loads and track deliveries.",
      roleSpecific: {
        Name: userName,
        Email: userEmail,
        Role: "Lorry Owner",
        Access: "Can view and accept loads",
      },
    },
    admin: {
      title: "Admin Profile",
      description: "You are registered as an Admin. You have access to manage users and system data.",
      roleSpecific: {
        Name: userName,
        Email: userEmail,
        Role: "Admin",
        Access: "Full control over the system",
      },
    },
  };

  const details = profileDetails[userType] || {};

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">{details.title}</h2>
        <p className="profile-description">{details.description}</p>
        <div className="profile-info">
          {details.roleSpecific &&
            Object.entries(details.roleSpecific).map(([key, value], idx) => (
              <div className="info-row" key={idx}>
                <span className="info-label">{key}:</span>
                <span className="info-value">{value}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
