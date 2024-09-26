import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Components/firebase';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Register = () => {

    const images = '/images/runnyrem-LfqmND-hym8-unsplash.jpg';
    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const register = (() => {
        createUserWithEmailAndPassword(auth, email, password).then(() => {
            alert('Registered Successfully')
        }).catch((error) => {

        })
    })

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
                    <h2 >Sign up</h2>
                    <p>Welcome To The Family!</p>
                    <form>
                        <label>First Name:</label>
                        <input type="firstname" placeholder="Enter your First Name" onChange={(e) => setName(e.target.value)} />
                        <label>Last Name:</label>
                        <input type='lastname' placeholder="Enter your Last Name" onChange={(e) => setLastName(e.target.value)} />
                        <label>Email Address:</label>
                        <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                        <label>Password:</label>
                        <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={register}>SIGNUP</button>
                    </form>
                    <p className="new-here"><Link to={'/admin'}>Already have an account?</Link></p>
                </div>
            </div>
        </div>
    );

}


export default Register;