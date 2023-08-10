import "./MainPage.scss";

function MainPage() {
  return (
    <>
      <h1> CV HACK</h1>
      <form className="form__current">
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

        <button> Submit </button>
      </form>
    </>
  );
}

export default MainPage;
