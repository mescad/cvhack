import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from './pages/MainPage';
import axios from 'axios';
import './styles/partials/_mixins.scss';
import './styles/partials/_resets.scss';
import './styles/partials/_typography.scss';
import './styles/partials/_variables.scss';
import ContactsPage from "./pages/ContactsPage";
import AboutPage from "./pages/AboutPage"
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<MainPage />} />
        
        <Route path="/main" element={<MainPage />} />
        <Route path="/contacts" element={<ContactsPage/>}/>
        <Route path="/about" element={<AboutPage/>}/>        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
