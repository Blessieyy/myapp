import Navbar from './Components/Navbar'
import PictureHomeSection from './Components/HomeComponents/PictureHomeSection';
import PremuimFacilities from './Components/HomeComponents/PremiumFacilities'



function App() {
    return (
        <div className="App">
            <Navbar />

            <div className='container main'>
                <PictureHomeSection />
                <PremuimFacilities />



            </div>
        </div>
    )
}

export default App;