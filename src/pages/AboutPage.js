import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./AboutPage.scss"

function About() {
  return (
    <section>
        <Navbar/>
      <div className="about__wrapper">
        <h2>
          {" "}
          Our mission
        </h2>
        <p> We are looking to revolusionise the way AI interacts with our CV and bring a new innovative way of refining CV's based on the job requirment.</p>

        
      </div>
      <Footer/>
    </section>
  );
}

export default About
