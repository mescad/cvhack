import "./MainPage.scss";
import axios from "axios";
import { useState } from "react";
// import { PDFDocument } from "pdfjs-dist";
// import pdf from "pdfjs-dist";
import * as pdfjsLib from "pdfjs-dist/webpack";

function MainPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  //file uploading from field and parsing

  const [pdfContent, setPdfContent] = useState("");


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
        console.log(pdf);

        const data= await pdf.getData()
        console.log(data);

        // console.log(new TextDecoder("utf-8").decode(data));

        // console.log(String.fromCharCode.apply(null, data));

        const page = await pdf.getPage(1);
        console.log(page);

        const textContent = await page.getTextContent();

        console.log(textContent.items);

         let extractedText = "";
         const pageText = textContent.items.map((item) => item.str).join(" ");
         extractedText += pageText;
         console.log(extractedText);

        // for (const page of pages) {
        //   const textContent = await page.getTextContent();
        //   const pageText = textContent.items.map((item) => item.str).join(" ");
        //   extractedText += pageText;
        // }


        setPdfContent(extractedText);
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      reader.readAsArrayBuffer(file);
    }
  };

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
              name="interestedRoleRequirements"
              className="inputcom__area"
              type="text"
              placeholder="Add your interested role description"
            />

            <button type="submit"> Submit </button>
          </form>
          <h2> Result</h2>
          <div dangerouslySetInnerHTML={{ __html: result }} />
        </>
      )}
    </>
  );
}

export default MainPage;
