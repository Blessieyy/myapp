import React from 'react';
import { useLocation } from 'react-router-dom';


const Review = () => {
    // Use the useLocation hook to get location information
    const location = useLocation();
    // Destructure the roomType and roomNumber from the location state
    const { roomType, roomNumber, } = location.state || { roomType: 'Not selected', roomNumber: 'Not selected' };
    const { rooms } = location.state || { rooms: [] }


    return (
        <div className="review-container">
            <header className="review-header">
                <button className="back-button">
                    <img src="back-icon.png" alt="Back" />
                </button>
                <h2>REVIEW</h2>
            </header>

            <div className="review-content">
                <div className="room-details">
                    <img
                        src="/images/chastity-cortijo-M8iGdeTSOkg-unsplash.jpg"
                        alt="Room"
                        className="room-image"
                    />
                    <div className="details-text">
                        <h3>Review</h3>
                        <p>[LOCATION]</p>
                        <h4>{roomType}</h4> {/* Use roomType here */}
                        <p>{ }</p>
                    </div>
                </div>

                <div className="booking-info">
                    <div className="booking-details">
                        <div className="booking-item">
                            <input type="text" value="BUSINESS" readOnly />
                        </div>
                        <div className="booking-item">
                            <input type="text" value={`${roomType} `} readOnly />
                            <img src="calendar-icon.png" alt="Calendar" className="calendar-icon" />
                        </div>
                        <div className="booking-item">
                            <input type="text" value={`${roomNumber} `} readOnly /> {/* Use roomNumber here */}
                        </div>
                    </div>

                    <div className="booking-price">
                        <p>Booking Price:</p>
                        <h2>[PRICE]</h2>
                    </div>

                    <div className="action-buttons">
                        <button className="home-button">HOME</button>
                        <button className="confirm-button">CONFIRM</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;
