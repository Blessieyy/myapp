
import Login from './Pages/Login';
import Register from './Pages/Register';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>

        <div className="container main">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
