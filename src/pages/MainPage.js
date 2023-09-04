import "./MainPage.scss";
import axios from "axios";
import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";
import ReactSwitch from "react-switch";
import Loading from "../components/Loading/Loading";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import tipsicon from "../assets/icons/tips-removebg-preview.png";
import deleteicon from "../assets/icons/cross-24-512.webp";
import refineicon from "../assets/icons/magic-wand_1538.png";
import redoicon from "../assets/icons/redo.png";

const PORT = process.env.REACT_APP_PORT || 8080;
const DOMAIN = process.env.REACT_APP_API_DOMAIN || "http://localhost";

function MainPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);

  //file uploading from field and parsing

  const [pdfContent, setPdfContent] = useState("");
  const [jobContent, setJobContent] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [reformatedCV, setReformatedCV] = useState(null);
  const [jobKeywords, setJobKeywords] = useState(null);
  const [showRefine, setRefine] = useState(false);

  console.log(toggle);

  const handleFileChange = async (event) => {
    event.preventDefault();

    console.log(event.target.files[0]);
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      console.log(pdfjsLib);

      reader.onload = async (e) => {
        const contents = e.target.result;
        const pdf = await pdfjsLib.getDocument(contents).promise;

        let extractedText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(" ");
          extractedText += pageText + "\n\n";
          console.log(extractedText);
        }
        setPdfContent(extractedText);
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleInputInfo = async (e) => {
    e.preventDefault();
    setLoading(true);

    const jobDescription = e.target["RoleRequirements"].value;

    setJobContent(jobDescription);

    console.log(jobDescription);
    console.log(`${DOMAIN}:${PORT}`);
    console.log(toggle);

    axios
      .post(`${DOMAIN}:${PORT}/api`, {
        jobDescription,
        pdfContent,
        toggle,
      })
      .then((res) => {
        setResponseData(res.data.finalResponse);
        setJobKeywords(res.data.jobKeywords);
        setReformatedCV(res.data.reformatedCV);
        setLoading(false);
        console.log(responseData);
        console.log(reformatedCV);
        console.log(jobKeywords);
      });
  };

  const handleRefineInfo = async (e) => {
    e.preventDefault();
    setLoading(true);

    const possitiveKeywords = e.target["possitiveKeywords"].value;
    const negativeKeywords = e.target["negativeKeywords"].value;

    console.log(possitiveKeywords);
    console.log(negativeKeywords);
    axios
      .post(`${DOMAIN}:${PORT}/api/refine`, {
        possitiveKeywords,
        negativeKeywords,
        reformatedCV,
        jobKeywords,
        responseData,
      })
      .then((res) => {
        setResponseData(res.data.refinedCV);
        setLoading(false);
      });
  };

  const handleDeleteDoc = () => {
    setPdfContent("");
  };

  const handleToggleChange = (checked) => {
    setToggle(checked);
  };

  const handleRefine = () => {
    setRefine(true);
  };

  return (
    <>
      <Navbar />

      <div className="mainpage__wrapper">
        {loading ? (
          <Loading />
        ) : responseData ? (
          <>
            <h2 className="response__title">
              {" "}
              Hacking complete! Here is the Final Result
            </h2>

            <div
              className="response__section"
              dangerouslySetInnerHTML={{ __html: responseData }}
            />
            <div className="button__group">
              <button
                className="button__startover"
                onClick={() => setResponseData(null)}
              >
                <img className="redoicon" src={redoicon} /> Start over again
              </button>
              <button className="button__refine" onClick={handleRefine}>
                <img className="refineicon" src={refineicon} /> Refine current
              </button>
            </div>
          </>
        ) : (
          <>
            <section className="input">
              <section className="input__top">
                <div className="input__upload">
                  <form>
                    <h2 className="input__header"> Step 1: Upload you CV</h2>
                    <div className=" input__top--tips">
                      <div className="input__tipgroup">
                        <img className="tipsicon" src={tipsicon} />
                        <p>Tips</p>
                      </div>
                      <p>- Try removing the Bio from the CV.</p>
                      <p>
                        {" "}
                        - Include a CV which has strictly
                        only job Experiences, Educational Background and a
                        separate section for your skills
                      </p>
                      <p>- Avoid using CV's with a complex structure/format</p>
                      <p>- Please use a one page CV for best results.</p>
                      
                    </div>
                    <div className="input__filemanage">
                      <input
                        className="input__top--file"
                        onChange={handleFileChange}
                        name="file"
                        type="file"
                      />
                      <button
                        className="input__deletefile"
                        onClick={handleDeleteDoc}
                      >
                        {" "}
                        <img className="deleteicon" src={deleteicon} />
                      </button>
                    </div>
                  </form>
                </div>
              </section>

              <section className="input__bottom">
                <form
                  className="input__bottom--jobdescription"
                  onSubmit={handleInputInfo}
                >
                  <h2 className="input__header"> Step 2: Add your job information</h2>

                  <div className="input__bottom--wrapper">
                    <div className="input__bottom--tips">
                      <ul>
                        <li>
                          <div className="input__tipgroup">
                            <img className="tipsicon" src={tipsicon} />
                            <p>Tips</p>
                          </div>
                        </li>
                        <li>
                          - Copy and paste a job description you find online (eg
                          Linkedin)
                        </li>
                        <li>
                          - Use a description which directly indicates the
                          minimum requirements, soft/hard skills and preffered
                          qualifications{" "}
                        </li>
                        <li>
                          {" "}
                          - Avoid using unnecesary details about company
                          history, culture, background etc. Strictly information
                          related to the job you're applying
                        </li>
                      </ul>
                    </div>

                    <div className="input__bottom--job">
                      <label className="input__bottom--label">
                        Add your interested role requirements, including
                        responsibilities, minimum qualifications, skills etc (max 300 words){" "}
                      </label>
                      <textarea
                        name="RoleRequirements"
                        className="input__bottom--area"
                        type="text"
                        placeholder="Add your interested role or a brief description"
                      />
                    </div>
                  </div>

                  <div className="input__wildmode">
                    <h4> Wild mode</h4>
                    <ReactSwitch
                      checked={toggle}
                      onChange={(checked, event, id) => {
                        handleToggleChange(checked);
                      }}
                    />
                  </div>
                  <button className="input__submit" type="submit">
                    {" "}
                    Submit{" "}
                  </button>
                </form>
              </section>
            </section>
          </>
        )}

        {showRefine && (
          <form className="refine__section" onSubmit={handleRefineInfo}>
            <div className="refine__group">
              <label> Add specific keywords to improve</label>
              <textarea
                name="possitiveKeywords"
                className="inputcom__refine-area"
                type="text"
                placeholder="Possitive keywords"
              ></textarea>
            </div>

            <div className="refine__group">
              <label> Add specific keywords to remove</label>
              <textarea
                name="negativeKeywords"
                className="inputcom__refine-area"
                type="text"
                placeholder="Negative Keywords"
              ></textarea>
            </div>
            <button className="button__startrefine" type="submit">
              <img className="refineicon" src={refineicon} /> Start Refining{" "}
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
}

export default MainPage;
