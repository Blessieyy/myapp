
import '../styles/Partials/_login.scss';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import SocialLogin from '../Components/SocialLogin';


const images = '/images/rhema-kallianpur-jbJ-_hw2yag-unsplash.jpg';
const Login = () => {
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
          <h2>Login</h2>
          <p>Welcome Back!</p>
          <form>
            <label>Email Address:</label>
            <input type="email" placeholder="Enter your email" />
            <label>Password:</label>
            <input type="password" placeholder="Enter your password" />
            <button type="submit">SIGNUP</button>
            <SocialLogin />

          </form>
          <p className="new-here">Are You New Around Here? <Link to={'/register'}> Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
