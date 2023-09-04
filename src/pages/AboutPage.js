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
          My mission
        </h2>
        <p> I am looking to revolusionise the way AI interacts with our CV and bring a new innovative way of refining CV's based on the job requirment.
            The app allows users to improve their chances of getting a job interview, by naturally integrating keywords related to the job application in various technical and non-technical contexts.The algorithm analyses the candidate's CV and the input data from the target job, extracting the main keywords and then integrates them into the context. The solution is strictly dependent on OpenAI Chat GPT API, which is heavily used to refine the data and then apply it into the inputted data, thus outputing a final CV which is relevant for the given job, while making it compliant with the modern ATS systems.
        </p>

        
      </div>
      <Footer/>
    </section>
  );
}

export default About
