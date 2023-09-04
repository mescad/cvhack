import "./Loading.scss";
import ReactLoading from "react-loading";
import tipsicon from "../../assets/icons/tips-removebg-preview.png";

function Loading() {
  return (
    <div className="loading__section">
      <h2 className="loading__header"> Hacking through your CV, please wait a minute</h2>
      <ReactLoading className="loading__bar" type={"bars"} color={"black"} height={50} width={150}/>

      <h3 className="loading__tips"><img className="tipslogo" src={tipsicon}/>Usefull tip: Make sure to clean out your CV of unnecesary words in order to allow the algorithm to extract the best keywords </h3>
    </div>
  );
}

export default Loading;
