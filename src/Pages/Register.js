import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../Components/firebase'; // Now using full Firestore SDK

const Register = () => {
  const images = '/images/rhema-kallianpur-jbJ-_hw2yag-unsplash.jpg';
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // For programmatic navigation

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const uid = user.uid;

      // Prepare the user data to save to Firestore
      const userData = {
        userName: firstName,
        surname: lastName,
        emailAddress: email,
        role: 'user', // Define the user role here
      };

      // Save the user data to Firestore under the 'users' collection
      await setDoc(doc(db, 'users', uid), userData);
      console.log('User added to Firestore successfully');

      alert('Registered Successfully! Welcome to the family.');
      navigate('/login'); // Navigate to login page after successful registration

    } catch (error) {
      console.error('Error registering user:', error.message);
      alert(`Error: ${error.message}`);
    }
  };

  // Optional: Handle real-time auth state changes
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is signed in:', user.uid);
    } else {
      console.log('No user signed in.');
    }
  });

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
          <form onSubmit={handleSignup}>
            <label>First Name:</label>
            <input
              type="text"
              placeholder="Enter your First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label>Last Name:</label>
            <input
              type="text"
              placeholder="Enter your Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <label>Email Address:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">SIGNUP</button>
          </form>
          <p className="new-here"><Link to={'/login'}>Already have an account?</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
