import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import InputField from '../../components/InputField';
import Button from '../../components/button';
import axiosInstance from '../../utils/axios';
import './auth.css'; 

const AdminSignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError('Name is required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and include at least 1 digit, 1 special character, and 1 letter.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const payload = {
        name,
        email,
        password,
        confirmPassword,
        role,
      };
      console.log('Request payload:', payload); 
      const response = await axiosInstance.post('/auth/register-admin', payload);
      console.log('Response:', response); 
      setSuccess(response.data.msg || 'Admin registered successfully!');
      setError('');
    } catch (err) {
      console.error('Registration error:', err); 
      if (err.msg) {
        setError(err.msg);
      } else if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError(err.message || 'Something went wrong');
      }
      setSuccess('');
    }
  };

  return (
    <div className="auth-page">
      <Navbar role="admin" />
      <div className="auth-container">
        <div className="form-section">
          <h1 className="auth-title">Sign Up</h1>
          <form className="auth-form" onSubmit={handleSignUp}>
            <InputField label="Name" type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
            <InputField label="Email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputField label="Password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <InputField label="Confirm Password" type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <InputField label="Role" type="text" placeholder="Enter your role (admin or student)" value={role} onChange={(e) => setRole(e.target.value)} />
            <Button text="Sign Up" type="submit" />
          </form>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <div className="auth-links">
            <a href="/admin-login" className="auth-link">Already have an account? Login</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminSignUp;