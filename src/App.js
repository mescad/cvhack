import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from './pages/MainPage';
import axios from 'axios';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<MainPage />} />
        
        <Route path="/main" element={<MainPage />} />
        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
