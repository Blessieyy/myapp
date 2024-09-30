import React, { useState } from 'react';


const RoomDetails = () => {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const images = [
        {
            pic: "/images/vojtech-bruzek-Yrxr3bsPdS0-unsplash.jpg"
        }
    ]

    return (
        <div className="room-details">
            <header className="header">
                <button className="back-button">
                    <i className="fas fa-arrow-left"></i> {/* Font Awesome back arrow */}
                </button>
                <h1 className='room-header'>The Capital Zimbali Resort</h1>
                <div className="username-section">
                    <i className="fas fa-user-circle"></i> {/* Font Awesome user icon */}
                    <span>USERNAME</span>
                </div>
            </header>
            {images.map((image, index) => (
                <div className="room-image-container" key={index}>
                    <img src={image.pic} alt='' className="room-image" />
                </div>
            ))}


            <div className="action-buttons">
                <button className="action-button">Map</button>
                <button className="action-button">Photos</button>
                <button className="action-button">Call</button>
                <button className="action-button">Reviews</button>
            </div>

            <div className="date-picker">
                <div className="date-input">
                    <label htmlFor="check-in">Check In</label>
                    <input
                        type="date"
                        id="check-in"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                    />
                </div>
                <div className="date-input">
                    <label htmlFor="check-out">Check Out</label>
                    <input
                        type="date"
                        id="check-out"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                    />
                </div>
            </div>

            <footer className="footer">
                <button className="continue-button">Continue</button>
            </footer>
        </div>
    );
};

export default RoomDetails;
