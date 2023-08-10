import "./MainPage.scss";
import axios from "axios";
import Response from "../components/components";
import {  useState } from "react";

function MainPage() {
  const [result, setResult] = useState(null);

  const openaiEndpoint =
    "https://api.openai.com/v1/engines/davinci/completions";
  const headers = {
    Authorization: "Bearer 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",
    "Content-Type": "application/json",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentRole = event.target[0].value;
    const currentRoleDescription = event.target[1].value;
    const interestedRole = event.target[2].value;
    const interestedRoleRequirements = event.target[3].value;

    // Construct the payload for API
    const payload = {
      prompt: `Refine CV for the role: ${interestedRole}. 
                   Requirements: ${interestedRoleRequirements}. 
                   Current Role: ${currentRole}. 
                   Current Role Description: ${currentRoleDescription}.`,
      max_tokens: 500,
    };

    try {
      const response = await axios.post(openaiEndpoint, payload, {
        headers: headers,
      });
      setResult(response.data.choices[0].text.trim()); 
      
    } catch (error) {
      console.error("Error calling OpenAI API", error);
      setResult("There was an error processing your request.");
    }
  };

  return (
    <>
      <h1> CV HACK</h1>
      <form className="form__current" onSubmit={handleSubmit}>
        <h2> Add your current role information</h2>
        <label className="inputcom__label">Add your current role </label>
        <input
          className="inputcom__input"
          type="text"
          placeholder="Add your current job role"
        />

        <label className="inputcom__label">
          Add your current role description{" "}
        </label>
        <textarea
          className="inputcom__input"
          type="text"
          placeholder="Add your current job description"
        />
        <h2> Add your interested job information</h2>
        <label className="inputcom__label">Add your interested role </label>
        <input
          className="inputcom__input"
          type="text"
          placeholder="Add your interested job role"
        />

        <label className="inputcom__label">
          Add your interested role requirements{" "}
        </label>
        <textarea
          className="inputcom__input"
          type="text"
          placeholder="Add your interested role description"
        />

        <button type="submit"> Submit </button>
      </form>

      <p>{result} </p>
    </>
  );
}

export default MainPage;
