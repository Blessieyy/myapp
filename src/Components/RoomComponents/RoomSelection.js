// RoomSelection.js
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import ImageUploadModal from '../ImageUploadModal'; // Ensure this is the correct import path
import { db, imgDb, txtDb } from '../firebase'; // Import your Firebase configuration
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';





const RoomSelection = () => {
    const [userName, setUserName] = useState(''); // State for user's first name
    const [surname, setSurname] = useState(''); // State for user's surname
    const [selectedRoom, setSelectedRoom] = useState(null); // State for selected room
    const [img, setImg]=useState('')
    const [txt, setTxt]=useState('')
    const [data, setData] = useState([])

    const navigate = useNavigate(); // Hook for navigation

    const handleUpload = (e) => {
        const file = e.target.files[0]; // Get the first file from the input
        console.log(file);
    
        if (file) {
            const imgs = ref(imgDb, `Imgs/${v4()}`);
            
            // Use the uploadBytes function correctly
            uploadBytes(imgs, file).then(data => {
                console.log(data, "imgs");
                return getDownloadURL(data.ref); // Get the download URL
            }).then(val => {
                setImg(val);
            }).catch(error => {
                console.error("Error uploading file:", error);
            });
        } else {
            console.error("No file selected.");
        }
    }
const db = getFirestore();

    const handleClick = async () =>{
        const valRef = collection(txtDb, 'txtData')
        await addDoc(valRef, {txtVal: txt, imgUrl: img})
        alert('Bro did you just add something')
        console.log('txtDb:', txtDb); // Should be an object representing your Firestore instance

    }
const getData = async () =>{
    const valRef = collection(txtDb, 'txtData')
    const dataDb = await getDocs(valRef)
    const allData = dataDb.docs.map(val=> ({...val.data(),id:val.id}))
    setData(allData)
    console.log(dataDb)
}

    useEffect(() => {
        getData();

        const auth = getAuth(); // Get authentication instance
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid; // Get user's ID
                const docRef = doc(db, 'users', uid); // Reference to the user's document in Firestore
                const docSnap = await getDoc(docRef); // Get the document snapshot
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUserName(userData.userName); // Set user's first name
                    setSurname(userData.surname); // Set user's surname
                } else {
                    console.log('No such document!'); // Handle case where document doesn't exist
                }
            }

        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);



    // Example room data
    // const rooms = [
    //     {
    //         name: 'Family Room',
    //         description: '2-4 Beds | Bath | [Television] Includes Indoor Gaming For More Family Time',
    //         rating: 5,
    //         price: 'PRICE',
    //         image: '/images/man-pan-KTSYy-3XVSo-unsplash.jpg'
    //     },
    //     {
    //         name: 'Executive Room',
    //         description: 'Bed | Shower | [Television] | Air Conditioner',
    //         rating: 3,
    //         price: 'PRICE',
    //         image: '/images/chastity-cortijo-M8iGdeTSOkg-unsplash.jpg'
    //     },
    //     {
    //         name: 'Deluxe Room',
    //         description: '2 Beds | Shower | Bath | Television | Air Conditioner | Balcony | Small Kitchen',
    //         rating: 4,
    //         price: 'PRICE',
    //         image: '/images/vojtech-bruzek-Yrxr3bsPdS0-unsplash.jpg'
    //     },
    //     {
    //         name: 'Suite',
    //         description: '3 Beds | Shower | Bath | Television | Air Conditioner | Balcony | Small Kitchen | Small living room and gaming room',
    //         rating: 5,
    //         price: 'PRICE',
    //         image: '/images/datingscout-KFDuhyW5H5w-unsplash.jpg'
    //     }
    // ];

    // // Handle room selection
    // const handleRoomSelect = (room) => {
    //     setSelectedRoom(room); // Set the selected room
    // };
    console.log(data, 'data')

    return (
        <div className="room-selection">
            <header className="header">
                <button className="back-button" onClick={() => navigate('/addrooms')}>
                    <FontAwesomeIcon icon={faBackward} />
                </button>
                <h1 className="room-header">Room Selection</h1>
                <div className="username-section">
                    <i className="fas fa-user-circle"></i>
                    <span>{userName} {surname}</span>
                </div>
            </header>

            <div className="room-list">
                {/* {rooms.map((room, index) => (
                    <div
                        className={`room-card ${selectedRoom === room ? 'selected' : ''}`} // Highlight selected room
                        key={index}
                        onClick={() => handleRoomSelect(room)} // Select room on click
                    >
                        <img src={room.image} alt={room.name} className="room-image" />
                        <div className="room-details">
                            <h2>{room.name}</h2>
                            <p>{room.description}</p>
                            <div className="rating">
                                {Array(room.rating).fill().map((_, i) => (
                                    <FontAwesomeIcon key={i} icon={faStar} />
                                ))}
                            </div>
                        </div>
                        <div className="room-price">
                            <span>{room.price}</span>
                        </div>
                    </div>
                ))} */}
            </div>

            {/* <footer className="footer-button">
                <button onClick={() => navigate('/')} className='home-button'>Home</button>
                <button onClick={() => navigate('/addrooms')} className="back-button">Back</button>
                <button
                    onClick={() => navigate('/roomdetails')}
                    className="continue-button"
                    disabled={!selectedRoom} // Disable if no room is selected
                >
                    Continue
                </button>
            </footer> */}
            <div>
                <input onChange={(e)=>setTxt(e.target.value)} />
                <input type='file' onChange={(e) =>handleUpload(e)} />
                <button onClick={handleClick}>Add</button>
                {
                    data.map(value=><div>
                        <h1>{value.txtVal}</h1>
                        <img src={value.imgUrl} height="200px" width= '200px'/>
                    </div>)
                }
            </div>
        </div>
    );
};

export default RoomSelection; // Export the component as default
