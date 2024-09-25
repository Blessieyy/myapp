
import '../styles/Partials/_login.scss';

import { Link } from 'react-router-dom';



const images = '/images/runnyrem-LfqmND-hym8-unsplash.jpg';
const Login = () => {
    return (
        <div className="login-page">
            <div className="left-section" style={{ backgroundImage: `url(${images})` }}>
                <div className="text-container">
                    <h1 className='Admin-head'>CostalLivingHotels.Com</h1>
                    <p className='Admin-head'>Places That Makes You Feel At Home</p>
                </div>
            </div>
            <div className="right-section">
                <div className="login-container">
                    <h2>Login As Admin</h2>
                    <p>Welcome Back!</p>
                    <form>
                        <label>Email Address:</label>
                        <input type="email" placeholder="Enter your email" />
                        <label>Password:</label>
                        <input type="password" placeholder="Enter your password" />
                        <button type="submit">LOGIN</button>

                    </form>
                    <p className="new-here">Are You New Around Here? <Link to={'/register'}> Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
