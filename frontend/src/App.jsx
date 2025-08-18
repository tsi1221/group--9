import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Footer from './components/Footer/Footer.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import DashboardLayout from './components/DashboardLayout/DashboardLayout.jsx';

import Home from './pages/public/Home/Home.jsx';
import Contact from './pages/public/Contact/Contact.jsx';
import Howitworks from './pages/public/Howitworks/Howitworks.jsx';
import Services from './pages/public/Services/Services.jsx';
import About from './pages/public/About/About.jsx';
import Signin from './pages/public/Signin/Signin.jsx';
import Signup from './pages/public/Signup/Signup.jsx';
import ForgetPassword from './pages/public/Forgetpassword/Forgetpassword.jsx';

import Dashboard from './pages/private/Dashboard/Dashboard.jsx';
import Users from './pages/private/Users/Users.jsx';
import Lawyers from './pages/private/Lawyer/Lawyer.jsx';
import Messages from './pages/private/Messages/Messages.jsx';
import Billings from './pages/private/Billings/Billings.jsx';
import Settings from './pages/private/Settings/Settings.jsx';
import Profile from './pages/private/profile/Profile.jsx';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

const PrivateLayout = () => (
  <DashboardLayout>
    <Outlet />
  </DashboardLayout>
);

const App = () => {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/howitworks" element={<Howitworks />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Route>

      {/* Private */}
      <Route
        element={
          <PrivateRoute>
            <PrivateLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/lawyers" element={<Lawyers/>} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/billings" element={<Billings />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
