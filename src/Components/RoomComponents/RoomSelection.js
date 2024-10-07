import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Navbar";
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons/faBackward';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import ImageUploadModal from '../ImageUploadModal';

const RoomSelection = () => {
    const [userName, setUserName] = useState(''); // State to hold the user's name
    const [surname, setSurname] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(null); // State to hold the selected room

    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                const docRef = doc(db, 'users', uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUserName(userData.userName);
                    setSurname(userData.surname);
                }
            }
        });

        return () => unsubscribe();
    }, []);

    const rooms = [
        {
            name: 'Family Room',
            description: '2-4 Beds | Bath | [Television] Includes Indoor Gaming For More Family Time',
            rating: 5,
            price: 'PRICE',
            image: '/images/man-pan-KTSYy-3XVSo-unsplash.jpg'
        },
        {
            name: 'Executive Room',
            description: 'Bed | Shower | [Television] | Air Conditioner',
            rating: 3,
            price: 'PRICE',
            image: '/images/chastity-cortijo-M8iGdeTSOkg-unsplash.jpg'
        },
        {
            name: 'Deluxe Room',
            description: '2 Beds | Shower | Bath | Television | Air Conditioner | Balcony | Small Kitchen',
            rating: 4,
            price: 'PRICE',
            image: '/images/vojtech-bruzek-Yrxr3bsPdS0-unsplash.jpg'
        },
        {
            name: 'Suite',
            description: '3 Beds | Shower | Bath | Television | Air Conditioner | Balcony | Small Kitchen | Small living room and gaming room',
            rating: 5,
            price: 'PRICE',
            image: '/images/datingscout-KFDuhyW5H5w-unsplash.jpg'
        }
    ];

    // Function to handle room selection
    const handleRoomSelect = (room) => {
        setSelectedRoom(room);
    };

    return (
        <div className="room-selection">

            <header className="header">
                <button className="back-button">
                    <i className="fas fa-arrow-left"><FontAwesomeIcon icon={faBackward} /></i>
                </button>
                <h1 className="room-header">Room selection</h1>
                <div className="username-section">
                    <i className="fas fa-user-circle"></i>
                    <span>{userName} {surname}</span>
                </div>
            </header>

            <div className="room-list">
                {rooms.map((room, index) => (
                    <div
                        className={`room-card ${selectedRoom === room ? 'selected' : ''}`} // Add 'selected' class if the room is selected
                        key={index}
                        onClick={() => handleRoomSelect(room)} // Call function to select room
                    >
                        <img src={room.image} alt={room.name} className="room-image" />
                        <div className="room-details">
                            <h2>{room.name}</h2>
                            <p>{room.description}</p>
                            <div className="rating">
                                {Array(room.rating).fill().map((_, i) => (
                                    <i key={i} className="fas fa-star"><FontAwesomeIcon icon={faStar} /></i>
                                ))}
                            </div>
                        </div>
                        <div className="room-price">
                            <span>{room.price}</span>
                        </div>
                    </div>
                ))}
            </div>

            <footer className="footer-button">
                <button onClick={() => navigate('/')} className='home-button'>Home</button>
                <button onClick={() => navigate('/addrooms')} className="back-button">Back</button>
                <button
                    onClick={() => navigate('/roomdetails')}
                    className="continue-button"
                    disabled={!selectedRoom} // Disable button if no room is selected
                >
                    Continue
                </button>
            </footer>
            <ImageUploadModal />
        </div>
    );
};

export default RoomSelection;
