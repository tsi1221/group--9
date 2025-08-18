import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';
import defaultAvatar from '../../../assets/avatar.png'; // Replace with a default avatar image

const Profile = () => {
  const [user, setUser] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    address: '',
    phone: '',
    provider: 'local',
    roleId: 2
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/api/users/profile')
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:3000/api/auth/user', user);
      alert('Profile updated successfully!');
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert('Failed to update profile!');
    }
  };

  const handleLogout = () => {
    // Clear auth tokens or session here
    alert('Logged out!');
    // Redirect to login page
    window.location.href = '/';
  };

  return (
    <div className="profile-wrapper">
      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      <div className="profile-container">
        <div className="profile-header">
          <img src={defaultAvatar} alt="Avatar" className="avatar"/>
          <div className="profile-info">
            <h2>{user.firstname} {user.middlename} {user.lastname}</h2>
            <p>{user.email}</p>
            <button onClick={() => setEditing(!editing)} className="edit-btn">
              {editing ? 'Cancel' : 'Edit'}
            </button>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-row">
            <label>First Name:</label>
            {editing ? <input name="firstname" value={user.firstname} onChange={handleChange}/> : <span>{user.firstname}</span>}
          </div>
          <div className="detail-row">
            <label>Middle Name:</label>
            {editing ? <input name="middlename" value={user.middlename} onChange={handleChange}/> : <span>{user.middlename}</span>}
          </div>
          <div className="detail-row">
            <label>Last Name:</label>
            {editing ? <input name="lastname" value={user.lastname} onChange={handleChange}/> : <span>{user.lastname}</span>}
          </div>
          <div className="detail-row">
            <label>Email:</label>
            {editing ? <input name="email" value={user.email} onChange={handleChange}/> : <span>{user.email}</span>}
          </div>
          <div className="detail-row">
            <label>Phone:</label>
            {editing ? <input name="phone" value={user.phone} onChange={handleChange}/> : <span>{user.phone}</span>}
          </div>
          <div className="detail-row">
            <label>Address:</label>
            {editing ? <input name="address" value={user.address} onChange={handleChange}/> : <span>{user.address}</span>}
          </div>

          {editing && (
            <div className="save-btn-container">
              <button onClick={handleSave} className="save-btn">Save Changes</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
