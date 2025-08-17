import React, { useState } from "react";
import axios from "axios";
import  "./Signup.css";
const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    provider: "local",  // default
    roleId: 2           // default as integer
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", formData);
      alert("User registered successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Registration failed!");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required />
        <input type="text" name="middlename" placeholder="Middle Name" value={formData.middlename} onChange={handleChange} required />
        <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone (+251...)" value={formData.phone} onChange={handleChange} required />

        {/* Role dropdown (optional) */}
        <select name="roleId" value={formData.roleId} onChange={handleChange}>
          <option value={2}>CLIENT</option>
          <option value={3}>LAWYER</option>C
        </select>

        <button type="submit">Register</button>
      </form>
       <div><p>If you have an account, please <a href="/signin">login</a>.</p></div>
    </div>
  );
};

export default Signup;
