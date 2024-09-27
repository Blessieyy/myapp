import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  console.log(firstName)
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      alert('Registered Successfully You good to go My Gee')
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

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
            <input type="firstname" placeholder="Enter your First Name" onChange={(e) => setFirstName(e.target.value)} />
            <label>Last Name:</label>
            <input type='lastname' placeholder="Enter your Last Name" onChange={(e) => setLastName(e.target.value)} />
            <label>Email Address:</label>
            <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
            <label>Password:</label>
            <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
            {/* <label> Confirm Password:</label>
            <input type="conpassword" placeholder="Confirm your password" /> */}
            <button type="submit">SIGNUP</button>
          </form>
          <p className="new-here"><Link to={'/login'}>Already have an account?</Link></p>
        </div>
      </div>
    </div>
  );

}


export default Register;