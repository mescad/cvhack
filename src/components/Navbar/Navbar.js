import { Link } from 'react-router-dom';
import "./Navbar.scss"
import openailogo from "../../assets/icons/1290202.png"
function Navbar() {
  return (
    <div className="navbar">
        <div className="navbar__group--left">   
      <Link to="/"> <h1 className="navbar__home">CVHACK</h1></Link>
      <h4>Powered by OpenAI</h4>
      <img className="openai__logo-navbar" src={openailogo} alt="openai__logo"/>
      </div>

<div className="navbar__group--right">
      <Link to="/contacts" > <h2 className="navbar__contacts">Contacts</h2></Link>
      <Link to="/about"> <h2 className="navbar__about">About</h2></Link>
      </div>

    </div>
  );
}

export default Navbar;
