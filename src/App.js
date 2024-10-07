import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Components/firebase";
import { useEffect, useState } from "react";



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
import Dashboard from "./Components/Dashboard";

import { ProtectedRoute } from "./Components/ProtectedRoute";


function App() {
    const [user, setUser] = useState('null')
    const [isFetching, setisFetching] = useState('true')
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setisFetching(false);


                return;
            }
            setUser(null);
            setisFetching(false);

        })
        return () => unsubscribe();
    }, []);
    if (isFetching) {
        return ( /* From Uiverse.io by aryamitra06 */

            <div class="loader">

                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>

            </div>

        )
    }
    return (
        <div className="App">
            <Router>

                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/adminreg" element={<AdminRegister />} />
                    <Route path="/addrooms" element={<Addrooms />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/roomselection" element={<RoomSelection />} />
                    <Route path="/roomdetails" element={<RoomDetails />} />
                    <Route path="/pay" element={<PaymentForm />} />
                    <Route path="/review" element={<Review />} />
                    <Route path="/dashboard" element={<ProtectedRoute user={user}>
                        <Dashboard></Dashboard>
                    </ProtectedRoute>} />

                </Routes>

                <div className='container main'>


                </div>
                <Footer />
            </Router>
        </div>
    )
}

export default App;