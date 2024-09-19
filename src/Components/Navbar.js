import { Link, useLocation } from "react-router-dom"


const Navbar = () => {
    return (
        <div className='navbar container'>

            <a href="/" className="logo">CoastalLivingHotels.com</a>

            <div className='nav-links'>
                <a href="/login">Login</a>
                <a href="/register">SignUp</a>
                <a href="/">Home</a>


            </div>
        </div>
    )
}

export default Navbar