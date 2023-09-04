import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./ContactsPage.scss"
import linkedinlogo from "../assets/icons/linkedin.png";
import githublogo from "../assets/icons/github.png";
import emaillogo from "../assets/icons/email-removebg-preview.png"

function Contacts() {
  return (
    <section>
        <Navbar/>
      <div className="contacts__wrapper">

        <h2>
          {" "}
          I hope you loved using my CV hacking tool. If you would like to get in
          contact with me, please see the details attached bellow:
        </h2>

        <div className="contacts__details">

<div className="details__group">  
        <h3>Email the creator here:</h3>
        <a href="mailto:dumitrumesca@gmail.com">  <img className="emaillogo" src={emaillogo}/></a>
        </div>
        <div className="details__group">  
        <h3> Make sure to follow the creator on Github</h3>
        <h3>
          {" "}
          <a href="https://github.com/mescad"> <img className="githublogo" src={githublogo}/></a>
        </h3>
        </div>
        <div className="details__group">  
        <h3>Find me on LinkedIn</h3>
        <h3>
          {" "}
          <a href="https://www.linkedin.com/in/dumitru-mesca96/">  <img className="linkedinlogo"  src={linkedinlogo}/></a>
        </h3>
        </div>
        </div>

      </div>
      <Footer/>
    </section>
  );
}

export default Contacts
