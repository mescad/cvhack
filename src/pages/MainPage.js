import "./MainPage.scss";
import axios from "axios";
import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";

function MainPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  //file uploading from field and parsing

  const [pdfContent, setPdfContent] = useState("");
  const [jobContent, setJobContent]= useState(null)

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


  const handleInputInfo= async (e)=>{
   e.preventDefault()

   const jobDescription = e.target["RoleRequirements"].value;
   setJobContent(jobDescription)

   console.log(jobContent)
   
  }

  return (
    <>
      <h1> CV HACK</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="file__upload">
            <form>
              <h2> Upload your CV in here</h2>
              <input onChange={handleFileChange} name="file" type="file" />
              <button> Upload</button>
            </form>
          </div>

          <form className="form__current">
            <h2> Add your job information</h2>

            <div>
              <h2> {pdfContent}</h2>
            </div>

            <label className="inputcom__label">
              Add your interested role requirements{" "}
            </label>
            <textarea
              name="RoleRequirements"
              className="inputcom__area"
              type="text"
              placeholder="Add your interested role description"
            />

            <button onClick={handleInputInfo} type="submit"> Submit </button>
          </form>
          <h2> Result</h2>
          <div dangerouslySetInnerHTML={{ __html: result }} />
        </>
      )}
    </>
  );
}

export default MainPage;
