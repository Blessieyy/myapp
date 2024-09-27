import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import HotelSearch from "./Components/SearchHotelComponents/HotelSearch";


import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Admin from './Pages/Admin';
import AdminRegister from './Pages/AdminRegister';

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
                </Routes>

                <div className='container main'>


                </div>
                <Footer />
            </Router>
        </div>
    )
}

export default App;