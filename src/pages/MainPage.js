import "./MainPage.scss";
import axios from "axios";
import Response from "../components/components";
import { useState } from "react";

function MainPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const openaiEndpoint = "https://api.openai.com/v1/chat/completions";
  const headers = {
    Authorization: "Bearer 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",
    "Content-Type": "application/json",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    //const currentRole = event.target["currentRole"].value;
    const currentRoleDescription = event.target["currentRoleDescription"].value;
    //const previousRole = event.target["previousRole"].value;
    const previousRoleDescription =
      event.target["previousRoleDescription"].value;
    const education = event.target["education"].value;
    const skills = event.target["skills"].value;
    const bio = event.target["bio"].value;
    const certifications = event.target["certifications"].value;

    const interestedRole = event.target["interestedRole"].value;
    const interestedRoleRequirements =
      event.target["interestedRoleRequirements"].value;

    // Construct the payload for API
    const payload = {
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          role: "user",
          content: `Based on this job role ${interestedRole} and description: ${interestedRoleRequirements}. Refine my CV for the role. Optimize for ATS systems. My Profile Bio in my CV is: ${bio} My profile bio contains a basic overview of what i've done in my career and what I'm looking to do. My Skills section in my CV is: ${skills}This section highlights the names of skills I'm proficient at. My Certifications section in my CV is: ${certifications}. My job experience section has the following jobs: ${currentRoleDescription} and  ${previousRoleDescription}
                    These are separated jobs i've had in the past. They contain information about what I did and what I accomplished. My Education Section is: ${education}. These are the schools I went to and the diplomas I  received. At the end of the response, summarize what was changed and why. explain in a separate section how this resume was ATS (Applicant Tracking System) optimized.  In a separate line, provide additional tips for securing this job.`,
        },
      ],
      temperature: 1,
      top_p: 1,
      n: 1,
      stream: false,
      max_tokens: 10000,
      presence_penalty: 0,
      frequency_penalty: 0,
    };

    try {
      const response = await axios.post(openaiEndpoint, payload, {
        headers: headers,
      });
      setResult(response.data.choices[0].message.content.trim());
    } catch (error) {
      console.error("Error calling OpenAI API", error);
      setResult("There was an error processing your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1> CV HACK</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <form className="form__current" onSubmit={handleSubmit}>
            <h2> Add your job information</h2>

            <h3> Current Job</h3>
            <label className="inputcom__label">Add your current role </label>
            <input
              name="currentRole"
              className="inputcom__input"
              type="text"
              placeholder="Add your current job role"
            />

            <label className="inputcom__label">
              Add your current role description{" "}
            </label>
            <textarea
              name="currentRoleDescription"
              className="inputcom__area"
              type="text"
              placeholder="Add your current job description"
            />

            <h3> Previous job </h3>
            <label className="inputcom__label">Add your previous role </label>
            <input
              name="previousRole"
              className="inputcom__input"
              type="text"
              placeholder="Add your previous job role"
            />

            <label className="inputcom__label">
              Add your previous role description{" "}
            </label>
            <textarea
              name="previousRoleDescription"
              className="inputcom__area"
              type="text"
              placeholder="Add your current job description"
            />

            <h3> Education</h3>
            <label className="inputcom__label">
              Add your eductation degree name{" "}
            </label>
            <input
              name="education"
              className="inputcom__input"
              type="text"
              placeholder="Add your degree"
            />

            <h3> Skills and Certifications</h3>
            <label className="inputcom__label">Add your skills </label>
            <textarea
              name="skills"
              className="inputcom__area"
              type="text"
              placeholder="Add your skills"
            />

            <label className="inputcom__label">Add your certifications </label>
            <textarea
              name="certifications"
              className="inputcom__area"
              type="text"
              placeholder="Add your certifications"
            />

            <h3> Bio</h3>
            <label className="inputcom__label">Add your bio </label>
            <textarea
              name="bio"
              className="inputcom__area"
              type="text"
              placeholder="Add your bio"
            />

            <h2> Add your interested job information</h2>
            <label className="inputcom__label">Add your interested role </label>
            <input
              name="interestedRole"
              className="inputcom__input"
              type="text"
              placeholder="Add your interested job role"
            />

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
          <p>{result} </p>
        </>
      )}
    </>
  );
}

export default MainPage;
