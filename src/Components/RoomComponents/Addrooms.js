import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';
import Navbar from "../Navbar";
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';





const Addrooms = () => {
    const [userName, setUserName] = useState(''); // State to hold the user's name
    const [surname, setSurname] = useState('')
    const [roomType, setRoomType] = useState('')
    const [roomNumber, setRoomNumber] = useState('1');
    const navigate = useNavigate();

    const handleNextClick = () => {
        // Navigate to the Review page and pass the selected values as state
        navigate('/review', {
            state: {
                roomType,
                roomNumber,
            },
        });
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                // Fetching user data from Firestore
                const docRef = doc(db, 'users', uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUserName(userData.userName); // Set the user's first name
                    setSurname(userData.surname)
                }
            }
        });

        // Clean up the subscription when the component unmounts
        return () => unsubscribe();
    }, []);

    return (
        <div className="hotel-search-container">
            <Navbar />
            <header className="header">
                <h1>Welcome, {userName}.{surname}</h1> {/* Display user's name here */}
                <p>Lets see where will you be comfortable:)</p>
                <div className="search-bar">
                    <input type="text" placeholder="Search Hotel" className="search-input" />
                    <button className="search-button">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </header>

            <div className="form-section">
                <div className="dropdown">
                    <select className="room-type" value={setRoomType} onChange={(e) => setRoomType(e.target.value)}>
                        <option>Resort</option>
                        <option>Hotel</option>
                        <option>Suite</option>
                    </select>
                </div>
                <div className="dropdown">
                    <select className="room-number" value={setRoomNumber} onChange={(e) => setRoomNumber(e.target.value)}>
                        <option>NO. OF ROOMS</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                </div>
            </div>

            <div className="search-button-container">
                <button onClick={() => navigate('/roomselection')} className="back-button">Next</button>
            </div>
        </div>
    );
};

export default Addrooms;
