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

import Dashboard from './pages/private/Dashboard/Dashboard.jsx';
import Calendar from './pages/private/Calendar/Calendar.jsx';
import Cases from './pages/private/Cases/Cases.jsx';
import Messages from './pages/private/Messages/Messages.jsx';
import Billings from './pages/private/Billings/Billings.jsx';
import Settings from './pages/private/Settings/Settings.jsx';

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
      </Route>

      {/* Private */}
      <Route
        element={
          <PrivateRoute>
            <PrivateLayout/>
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/billings" element={<Billings />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default App;
