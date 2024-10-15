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
    const [desc, setDesc] = useState('')
    const [pr, setPr] = useState('')
    const [rat, setRat] = useState('')
    const [data, setData] = useState([])

    const navigate = useNavigate(); // Hook for navigation

    const handleUpload = (e) => {
        const file = e.target.files[0]; // Get the first file from the input
        // console.log(file);
    
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
        const valRef = collection(db, 'rooms')
        await addDoc(valRef, {txtVal: txt, imgUrl: img, desc, pr, rat})
        alert('Bro did you just add something')
        // console.log('txtDb:', txtDb);
        getData() 

    }
const getData = async () =>{
    const valRef = collection(db, 'rooms')
    const dataDb = await getDocs(valRef)
    const allData = dataDb.docs.map(val=> ({...val.data(),id:val.id}))
    setData(allData)
    // console.log(dataDb)
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


const rooms ={
    "description": "Room description here",
    "price": "Room price here",
    "rating": 4,
    "imgUrl": "image URL here"
}
   
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
            <input onChange={(e)=>setTxt(e.target.value)} placeholder='Room Name' />
                <input onChange={(e) => setDesc(e.target.value)} placeholder="Description" />
                <input onChange={(e) => setRat(e.target.value)} placeholder="Price" />
                <input onChange={(e) => setPr(e.target.value)} placeholder="Rating" />
                <input type='file' onChange={(e) =>handleUpload(e)} />
                <button onClick={handleClick}>Add</button>
                {
                    data.map(value=><div>
                        <h1>{value.txtVal}</h1>
                        <img src={value.imgUrl} height="200px" width= '200px'/>
                        <p>{value.desc}</p>
                        <p>Price: {value.pr}</p>
                        <p>Rating: {value.rat}</p>
                    </div>)
                }
            </div>

            <footer className="footer-button">
                <button onClick={() => navigate('/')} className='home-button'>Home</button>
                <button onClick={() => navigate('/addrooms')} className="back-button">Back</button>
                <button
                    onClick={() => navigate('/roomdetails')}
                    className="continue-button"
                    disabled={!selectedRoom} // Disable if no room is selected
                >
                    Continue
                </button>
            </footer>
            <div>
               
            </div>
        </div>
    );
};

export default RoomSelection; // Export the component as default
