


const HotelSearch = () => {
    return (
        <div className="hotel-search-container">
            <header className="header">
                <h1>Welcome </h1>
                <div className="search-bar">
                    <input type="text" placeholder="Search Hotel" className="search-input" />
                    <button className="search-button">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </header>

            <div className="form-section">
                <div className="dropdown">
                    <select className="room-type">
                        <option>Regular</option>
                        <option>Deluxe</option>
                        <option>Suite</option>
                    </select>
                </div>
                <div className="dropdown">
                    <select className="room-number">
                        <option>NO. OF ROOMS</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                </div>
            </div>

            <div className="search-button-container">
                <button className="main-search-button">SEARCH</button>
            </div>
        </div>
    );
};

export default HotelSearch;
