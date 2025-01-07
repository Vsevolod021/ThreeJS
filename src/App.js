import { Routes, Route } from 'react-router-dom';
import Bricks from './pages/Bricks';
import Globe from './pages/Globe';
import Home from './pages/Home';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bricks" element={<Bricks />} />
        <Route path="/globe" element={<Globe />} />
      </Routes>
    </div>
  );
}

export default App;
