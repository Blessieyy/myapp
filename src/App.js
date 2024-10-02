import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";


import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Admin from './Pages/Admin';
import AdminRegister from './Pages/AdminRegister';
import Addrooms from "./Components/RoomComponents/Addrooms";
import UserProfile from "./Pages/UserProfile";
import RoomSelection from "./Components/RoomComponents/RoomSelection";
import RoomDetails from "./Components/RoomComponents/RoomDetails";
import PaymentForm from "./Components/PaymentForm";
import Review from "./Components/RoomComponents/Review";


function App() {
    return (
        <div className="App">
            <Router>

                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/" element={<AdminRegister />} />
                    <Route path="/addrooms" element={<Addrooms />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/roomselection" element={<RoomSelection />} />
                    <Route path="/roomdetails" element={<RoomDetails />} />
                    <Route path="/pay" element={<PaymentForm />} />
                    <Route path="/review" element={<Review />} />
                </Routes>

                <div className='container main'>


                </div>
                <Footer />
            </Router>
        </div>
    )
}

export default App;