import React from 'react';

import { Link, Navigate, useNavigate } from 'react-router-dom';
const Register = () => {

  const images = '/images/rhema-kallianpur-jbJ-_hw2yag-unsplash.jpg';
  return (
    <div className="login-page">
      <div className="left-section" style={{ backgroundImage: `url(${images})` }}>
        <div className="text-container">
          <h1>CostalLivingHotels.Com</h1>
          <p>Places That Makes You Feel At Home</p>
        </div>
      </div>
      <div className="right-section">
        <div className="login-container">
          <h2>Sign up</h2>
          <p>Welcome To The Family!</p>
          <form>
            <label>First Name:</label>
            <input type="firstname" placeholder="Enter your First Name" />
            <label>Last Name:</label>
            <input type='lastname' placeholder="Enter your Last Name" />
            <label>Email Address:</label>
            <input type="email" placeholder="Enter your email" />
            <label>Password:</label>
            <input type="password" placeholder="Enter your password" />
            <label> Confirm Password:</label>
            <input type="conpassword" placeholder="Confirm your password" />
            <button type="submit">SIGNUP</button>
          </form>
          <p className="new-here"><Link to={'/login'}>Already have an account?</Link></p>
        </div>
      </div>
    </div>
  );

}


export default Register;